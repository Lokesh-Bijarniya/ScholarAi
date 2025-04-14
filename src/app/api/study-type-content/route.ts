import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { db } from "@/lib/db/client";
import { STUDY_TYPE_CONTENT_TABLE } from "@/lib/db/schema";

export async function POST(req) {
  const { chapters, courseId, type } = await req.json();
  const PROMPT =
    type === "flashcards"
      ? `Generate up to 15 flashcards in JSON format on the topic: "${chapters}". 
Each flashcard should include a "front" (question or term) and a "back" (answer or explanation).`
      : `Generate a quiz on the topic: "${chapters}", with each question including multiple options and the correct answer.
Return the result in JSON format.`;

  // Check if courseId is valid
  if (!courseId) {
    return NextResponse.json({ error: "Invalid courseId" }, { status: 400 });
  }

  //Insert record to db, update status to "Generating"
  const res = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId,
      type,
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  //Trigger the Inngest function
  inngest.send({
    name: "studyType.content",
    data: {
      studyType: type,
      prompt: PROMPT,
      courseId,
      recordId: res[0].id,
    },
  });

  return NextResponse.json(res[0].id);
}
