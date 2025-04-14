import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { db } from "@/lib/db/client";
import { USER_TABLE } from "@/lib/db/schema";

export const POST = async (req: NextRequest) => {
  try {
    const { user } = await req.json();
    console.log(user);

    if (!user || !user.email) {
      return new NextResponse(
        JSON.stringify({ error: "User data is missing" }),
        { status: 400 }
      );
    }

    // 🛑 Check if the user already exists in the DB
    const existingUser = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user.email));
    if (existingUser.length > 0) {
      console.log("User already exists, skipping event");
      return NextResponse.json({ message: "User already exists" });
    }

    // ✅ Only send the event if user is new
    const result = await inngest.send({
      name: "user.create",
      data: { user },
    });

    console.log("Inngest event sent:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
};
