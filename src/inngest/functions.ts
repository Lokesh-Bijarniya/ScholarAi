import {
  generateNotesAiModel,
  GenerateQuizAiModel,
  GenerateStudyTypeContentAiModel,
} from "@/ai-config/AiModel";
import { eq } from "drizzle-orm";

import {
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/lib/db/schema";
import { inngest } from "./client";
import { db } from "@/lib/db/client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-new-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const user = event.data.user;
    console.log("user in inngest", user);

    const response = await step.run(
      "Check User and Create New User if not in Database",
      async () => {
        try {
          const email = user?.email;
          if (!email) throw new Error("User email is missing");

          const result = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, email));
          console.log(result);

          if (result.length > 0) {
            console.log("User already exists, skipping creation");
            return { message: "User already exists" };
          }

          const createUser = await db
            .insert(USER_TABLE)
            .values({
              name: user?.name,
              age: user?.age || null,
              email: user?.email,
            })
            .returning({ id: USER_TABLE.id });

          console.log("User created successfully: ", createUser);

          return {
            message: "User created",
            user: {
              id: createUser?.[0]?.id,
              name: user?.name,
              email: user?.email,
              age: user?.age || null,
            },
          };
        } catch (err) {
          console.error("Error inside step.run:", err);
          throw err;
        }
      }
    );
  }
);

//Step is to Send Welcome Email Notification

//Step to Send Email Notification After 3 days Once user joined

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    // 1. Generate Notes
    await step.run("Generate Chapter Notes", async () => {
      const Chapters = course?.courseLayout?.chapters;

      for (let index = 0; index < Chapters.length; index++) {
        const chapter = Chapters[index];
        chapter.chapterNumber = undefined;

        const PROMPT = `
    Generate study material detail content for each chapter, make sure to include all topic points in the content. Give content in HTML format (no HTML, head, body, or title tags). The chapter: ${JSON.stringify(
      chapter
    )}
    `;

        const result = await generateNotesAiModel.sendMessage(PROMPT);

        const rawText = await result.response.text(); // 🟢 call the function
        console.log("Raw text from AI:", rawText);

        await db.insert(CHAPTER_NOTES_TABLE).values({
          courseId: course?.courseId,
          chapterId: index,
          notes: rawText,
        });
      }

      return "All chapters processed";
    });

    // 2. Update Course Status
    await step.run("Update Course Status to Ready", async () => {
      await db
        .update(STUDY_MATERIAL_TABLE)
        .set({ status: "Ready" })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return "Success";
    });
  }
);

// Use to generate flashcards, quiz & qa
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;


    const AiRes = await step.run(
      "Generate Flashcards using AI",
      async () => {
        const result =  studyType === "flashcards" ?
        await GenerateStudyTypeContentAiModel.sendMessage( prompt) : 
        await GenerateQuizAiModel.sendMessage(prompt);
        const rawText = await JSON.parse(result.response.text()); 
        // console.log("Raw text from AI:", rawText);
        return rawText;
      }
    );

    // console.log("flash-ai-res",flashAiRes);

    // save the result
    const dbResult = await step.run("Save Result to DB", async () => {
      const result = await db.update(STUDY_TYPE_CONTENT_TABLE).set({
          content: AiRes,
          status: "Ready",
        }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
      return "Data saved successfully";
    });
  }
);
