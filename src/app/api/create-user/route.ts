import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req : NextRequest, res: NextResponse) => {
    const {user} = req.json();

    const result = await inngest.send({
        name : 'user.create',
        data:{
            user: user
        }
    })

    return res.json(result);
}