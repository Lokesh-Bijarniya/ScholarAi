import { courseOutlineAiModel } from "@/ai-config/AiModel";
import { STUUDY_MATERIAL_TABLE } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const {courseId, topic, courseType, difficultLevel, createdBy} = await req.json();

    const PROMPT = `Generate a study material for '+topic+' for '+courseType+' and level of difficulty will be '+difficultLevel+' with the summary of course, List of chapters along with summary for each chapter, Topic list in each chapter in json format`
//Generate Course Layout using AI
const res = await courseOutlineAiModel.sendMessage(PROMPT);
const aiResult = JSON.parse(res.response.text);

//Save the result along with the user input
const result = await db.insert(STUUDY_MATERIAL_TABLE).values({
    courseId,
    courseType,
    topic,
    difficultLevel,
    courseLayout : aiResult,
    createdBy,
    status : "Generated"
}).returning({STUUDY_MATERIAL_TABLE});

    console.log(result);
    return NextResponse.json(result[0]);
}