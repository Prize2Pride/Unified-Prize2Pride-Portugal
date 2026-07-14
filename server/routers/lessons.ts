import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { getDb } from "../db";
import { lessons, userProgress, InsertLesson, InsertUserProgress } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";

export const lessonsRouter = router({
  // List all published lessons, optionally filtered by level
  list: publicProcedure
    .input(z.object({ level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      try {
        const rows = await db.select().from(lessons);
        const published = rows.filter((l) => l.isPublished !== false);
        if (input.level) return published.filter((l) => l.level === input.level);
        return published;
      } catch (e) {
        console.error("[Lessons List Error]", e);
        return [];
      }
    }),

  // Get a single lesson by id
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      try {
        const result = await db.select().from(lessons).where(eq(lessons.id, input.id)).limit(1);
        return result[0] ?? null;
      } catch (e) {
        console.error("[Lesson Get Error]", e);
        return null;
      }
    }),

  // Create lesson (admin only)
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        titlePt: z.string(),
        description: z.string().optional(),
        level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).default("A1"),
        topic: z.string().optional(),
        order: z.number(),
        vocabulary: z.array(
          z.object({
            word: z.string(),
            translation: z.string(),
            pronunciation: z.string(),
            example: z.string().optional(),
          })
        ),
        grammar: z.string().optional(),
        readingComprehension: z.string().optional(),
        readingComprehensionTranslation: z.string().optional(),
        dialogues: z
          .array(z.object({ speaker: z.string(), text: z.string() }))
          .optional(),
        quizQuestions: z.array(
          z.object({
            id: z.string(),
            type: z.enum(["multiple-choice", "true-false"]),
            question: z.string(),
            options: z.array(z.string()).optional(),
            correctAnswer: z.union([z.string(), z.number(), z.boolean()]),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Admin only");
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const newLesson: InsertLesson = {
        title: input.title,
        titlePt: input.titlePt,
        description: input.description,
        level: input.level,
        topic: input.topic,
        order: input.order,
        vocabulary: JSON.stringify(input.vocabulary),
        grammar: input.grammar,
        readingComprehension: input.readingComprehension,
        readingComprehensionTranslation: input.readingComprehensionTranslation,
        dialogues: input.dialogues ? JSON.stringify(input.dialogues) : null,
        quizQuestions: JSON.stringify(input.quizQuestions),
        isPublished: true,
      };
      await db.insert(lessons).values(newLesson);
      return { success: true };
    }),

  // Get progress for a specific lesson
  getProgress: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;
      try {
        const result = await db
          .select()
          .from(userProgress)
          .where(and(eq(userProgress.userId, ctx.user!.id), eq(userProgress.lessonId, input.lessonId)))
          .limit(1);
        return result[0] ?? null;
      } catch (e) {
        console.error("[Progress Get Error]", e);
        return null;
      }
    }),

  // Save or update lesson progress
  saveProgress: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        quizScore: z.number().optional(),
        timeSpent: z.number().optional(),
        isCompleted: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      try {
        const existing = await db
          .select()
          .from(userProgress)
          .where(and(eq(userProgress.userId, ctx.user!.id), eq(userProgress.lessonId, input.lessonId)))
          .limit(1);
        if (existing.length > 0) {
          await db
            .update(userProgress)
            .set({
              quizScore: input.quizScore ?? existing[0].quizScore,
              timeSpent: input.timeSpent ?? existing[0].timeSpent,
              isCompleted: input.isCompleted ?? existing[0].isCompleted,
              completedAt: input.isCompleted ? new Date() : existing[0].completedAt,
            })
            .where(eq(userProgress.id, existing[0].id));
        } else {
          const newProgress: InsertUserProgress = {
            userId: ctx.user!.id,
            lessonId: input.lessonId,
            quizScore: input.quizScore,
            timeSpent: input.timeSpent,
            isCompleted: input.isCompleted ?? false,
            completedAt: input.isCompleted ? new Date() : undefined,
          };
          await db.insert(userProgress).values(newProgress);
        }
        return { success: true };
      } catch (e) {
        console.error("[Progress Save Error]", e);
        throw new Error("Failed to save progress");
      }
    }),

  // Get all progress for the current user
  getAllProgress: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    try {
      return await db.select().from(userProgress).where(eq(userProgress.userId, ctx.user!.id));
    } catch (e) {
      console.error("[All Progress Error]", e);
      return [];
    }
  }),

  // Stats summary per level
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return {};
    try {
      const allLessons = await db.select().from(lessons);
      const progress = await db.select().from(userProgress).where(eq(userProgress.userId, ctx.user!.id));
      const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
      const stats: Record<string, { total: number; completed: number; avgScore: number; totalTime: number }> = {};
      for (const level of levels) {
        const levelLessons = allLessons.filter((l) => l.level === level);
        const levelProgress = progress.filter((p) =>
          levelLessons.some((l) => l.id === p.lessonId)
        );
        const completed = levelProgress.filter((p) => p.isCompleted).length;
        const scores = levelProgress.filter((p) => p.quizScore !== null).map((p) => p.quizScore!);
        const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const totalTime = levelProgress.reduce((a, p) => a + (p.timeSpent ?? 0), 0);
        stats[level] = { total: levelLessons.length, completed, avgScore, totalTime };
      }
      return stats;
    } catch (e) {
      console.error("[Stats Error]", e);
      return {};
    }
  }),
});
