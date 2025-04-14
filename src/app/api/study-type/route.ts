import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/lib/db/schema";

export async function POST(req) {
  const { courseId, studyType } = await req.json();
  console.log("courseId", courseId);
  console.log("studyType", studyType);
  if (!courseId || !studyType) {
    return NextResponse.json({ message: "courseId or studyType is missing" });
  }

  if (studyType === "ALL") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

    //GET THE ALL Other Study Type Records
    const contentList = await db.select().from(STUDY_TYPE_CONTENT_TABLE).where(
      eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));


    const result = {
      notes: notes,
      flashcards: contentList?.filter(
        (item) => item?.type === "flashcards" && item?.courseId === courseId 
      ),
      quiz: contentList?.filter(
        (item) => item?.type === "Quiz" && item?.courseId === courseId
        ),
      qa: contentList?.filter(
        (item) => item?.type === "qa" && item?.courseId === courseId
      ),
    };

    // console.log("ressult", result);

    return NextResponse.json(result);
  } else if (studyType === "NOTES") {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));
    // console.log("notes", notes);
    return NextResponse.json(notes);
  }else{
    const result = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
        )
      );
    // console.log("res", result);
    return NextResponse.json(result[0]);
  }
}
