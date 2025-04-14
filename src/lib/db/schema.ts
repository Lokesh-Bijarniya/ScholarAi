import { boolean } from "drizzle-orm/gel-core";
import { timestamp, pgTable } from "drizzle-orm/pg-core";
import { integer,varchar, serial, json, text } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember: boolean().default(false),
  customerId : varchar(),
});


export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  courseType: varchar("courseType").notNull(),
  topic: varchar("topic"),
  difficultyLevel: varchar("difficultyLevel"),
  courseLayout: json("courseLayout"),
  createdBy: varchar("createdBy").notNull(),
  status: varchar("status").default("Generating"),
  thumbnailUrl: varchar("thumbnailUrl").default("https://img.freepik.com/free-vector/realistic-book-lover-composition-with-stack-colorful-books-with-eyeglasses-home-plants-tea-cup-vector-illustration_1284-77312.jpg?ga=GA1.1.1868646172.1743450492&semt=ais_hybrid&w=740"),
  createdAt: timestamp("createdAt", { mode: 'date' }).defaultNow().notNull(),
});



export const CHAPTER_NOTES_TABLE = pgTable("chapterNotes",{
  id: serial("id").primaryKey(),
  courseId : varchar("courseId").notNull(),
  chapterId: integer("chapterId").notNull(),
  notes: text(),
});

export const STUDY_TYPE_CONTENT_TABLE = pgTable("studyTypeContent", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  content: json("content"),
  type : varchar("type").notNull(),
  status: varchar("status").default("Generating"),
});

export const PAYMENT_RECORD_TABLE = pgTable("paymentRecord", {
  id: serial("id").primaryKey(),
  customerId : varchar("customerId").notNull(),
  sessionId : varchar("sessionId").notNull(),
});