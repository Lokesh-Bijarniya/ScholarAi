import { NextRequest, NextResponse } from "next/server";
import { courseOutlineAiModel } from "@/ai-config/AiModel";
import { inngest } from "@/inngest/client";
import { db } from "@/lib/db/client";
import { STUDY_MATERIAL_TABLE } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const { courseId, topic, studyType, difficultyLevel, createdBy } =
    await req.json();
  const courseType = studyType;

  const PROMPT = `Generate a study material for '${topic}' for '${courseType}' and level of difficulty will be '${difficultyLevel}' with the summary of course, list of chapters along with summary and Emoji icon for each chapter, topic list in each chapter in JSON format.`;

  //Generate Course Layout using AI
  const aiRes = await courseOutlineAiModel.sendMessage(PROMPT);
  const rawText = await aiRes.response.text(); // ← note the parentheses
  console.log("AI Raw Response:", rawText);

  const aiResult = JSON.parse(rawText); // Only if rawText is valid JSON

  //Save the result along with the user input
  const dbResult = await db
    .insert(STUDY_MATERIAL_TABLE)
    .values({
      courseId,
      courseType,
      topic,
      difficultyLevel,
      courseLayout: aiResult,
      createdBy,
      status: "Generating",
      createdAt: new Date(),
    })
    .returning({ resp: STUDY_MATERIAL_TABLE });

  // Trigger the inngest function to generate chapters
  const result = await inngest.send({
    name: "notes.generate",
    data: {
      course: dbResult[0].resp,
    },
  });
  console.log("Inngest Response:", result);

  return NextResponse.json({ result: dbResult[0] });
}
