import { integer, pgTable, varchar, serial, json } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  courseType: varchar("courseType").notNull(),
  topic: varchar("topic").notNull(),
  difficultLevel: varchar("difficultLevel").default("Easy"),
  courseLayout: json("courseLayout"), 
  createdBy: varchar("createdBy").notNull(),
  status: varchar("status").default("Generating"),
});