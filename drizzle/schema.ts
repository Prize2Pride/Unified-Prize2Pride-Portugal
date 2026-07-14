import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Lessons table — structured Portuguese lessons A1-C2.
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titlePt: varchar("titlePt", { length: 255 }).notNull(),
  description: text("description"),
  level: mysqlEnum("level", ["A1", "A2", "B1", "B2", "C1", "C2"]).default("A1").notNull(),
  topic: varchar("topic", { length: 255 }),
  order: int("order").notNull(),
  /** JSON array of { word, translation, pronunciation, example } */
  vocabulary: json("vocabulary").notNull(),
  grammar: text("grammar"),
  readingComprehension: text("readingComprehension"),
  readingComprehensionTranslation: text("readingComprehensionTranslation"),
  dialogues: json("dialogues"),
  /** JSON array of { id, type: 'multiple-choice'|'true-false', question, options?, correctAnswer } */
  quizQuestions: json("quizQuestions").notNull(),
  isPublished: boolean("isPublished").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * User progress per lesson.
 */
export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  isCompleted: boolean("isCompleted").default(false),
  quizScore: int("quizScore"),
  timeSpent: int("timeSpent"), // seconds
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * Chat history for Professor Carlos conversations.
 */
export const chatHistory = mysqlTable("chatHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userMessage: text("userMessage").notNull(),
  assistantMessage: text("assistantMessage").notNull(),
  style: varchar("style", { length: 50 }).default("formal").notNull(),
  topic: varchar("topic", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ChatHistory = typeof chatHistory.$inferSelect;
export type InsertChatHistory = typeof chatHistory.$inferInsert;
