import { inngest } from "./client";
import {db} from '@/lib/db/client';
import { eq } from "drizzle-orm";
import { USER_TABLE } from "@/lib/db/schema";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


export const CreateNewUser = inngest.createFunction(
  { id: "create-new-user" },
  { event: "user/create.new" },
  async ({ event, step }) => {
    // Get User Data
    const user = event.data.user;

    //Get Event Data
    await step.run("Check User and Create New User if not in Database", async () =>{
      // Check if the user is exist
               const result = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
               console.log(result);
      
               if(result.length == 0){
                   // Create new user in the database
                   const createUser = await db.insert(USER_TABLE).values({
                       name: user?.firstName,
                       age: user?.age,
                       email: user?.primaryEmailAddress?.emailAddress
                   }).returning({id:USER_TABLE.id});
      
                   console.log("User created successfully: ", createUser);
                   return createUser;
               }
               return result;
    });
    return "Success";
  }

  //Step is to Send Welcome Email Notification

  //Step to Send Email Notification After 3 days Once user joined
);