import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

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
 * Per-learner language and companion settings. Defaults keep Portuguese accessible
 * while allowing Tunisia-first Arabic and Tunisian-dialect explanations.
 */
export const learnerPreferences = mysqlTable("learnerPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  tutor: mysqlEnum("tutor", ["roued", "chandra"]).default("roued").notNull(),
  explanationLanguage: mysqlEnum("explanationLanguage", ["ar", "tounsi", "pt", "en"]).default("ar").notNull(),
  immersionMode: mysqlEnum("immersionMode", ["guided", "balanced", "immersive"]).default("balanced").notNull(),
  dailyGoalMinutes: int("dailyGoalMinutes").notNull().default(15),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type LearnerPreference = typeof learnerPreferences.$inferSelect;

/**
 * Situation-level practice signals enable adaptive review without storing sensitive free-form speech.
 */
export const situationPractice = mysqlTable("situationPractice", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  situationId: varchar("situationId", { length: 32 }).notNull(),
  masteryScore: int("masteryScore").notNull().default(0),
  attempts: int("attempts").notNull().default(0),
  lastPracticedAt: timestamp("lastPracticedAt"),
  nextReviewAt: timestamp("nextReviewAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("situation_practice_user_situation_unique").on(table.userId, table.situationId)]);
export type SituationPractice = typeof situationPractice.$inferSelect;

/**
 * Short-form feed progress. This stores learning signals only, not free-form learner responses.
 */
export const microMomentProgress = mysqlTable("microMomentProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  momentId: varchar("momentId", { length: 64 }).notNull(),
  isSaved: boolean("isSaved").default(false).notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  correctAttempts: int("correctAttempts").notNull().default(0),
  lastSeenAt: timestamp("lastSeenAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("micro_moment_progress_user_moment_unique").on(table.userId, table.momentId)]);
export type MicroMomentProgress = typeof microMomentProgress.$inferSelect;

/**
 * Chat history for Portuguese tutor conversations.
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
