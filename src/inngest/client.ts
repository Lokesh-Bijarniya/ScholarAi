import { Inngest } from "inngest";

console.log("Inngest Event Key:", process.env.INNGEST_EVENT_KEY);

export const inngest = new Inngest({
  id: "ScholarAi", 
  eventKey: process.env.INNGEST_EVENT_KEY, 
});
