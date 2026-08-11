import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, learnerPreferences, LearnerPreference, microMomentProgress, situationPractice, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { masteryScoreAfterAttempt, nextReviewAtForScore } from "./practiceScheduler";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export type LearnerPreferenceUpdate = {
  tutor?: "roued" | "chandra";
  explanationLanguage?: "ar" | "tounsi" | "pt" | "en";
  immersionMode?: "guided" | "balanced" | "immersive";
  dailyGoalMinutes?: number;
};

export async function getLearnerPreferences(userId: number): Promise<LearnerPreference | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const existing = await db.select().from(learnerPreferences).where(eq(learnerPreferences.userId, userId)).limit(1);
  if (existing[0]) return existing[0];
  await db.insert(learnerPreferences).values({ userId });
  const created = await db.select().from(learnerPreferences).where(eq(learnerPreferences.userId, userId)).limit(1);
  return created[0];
}

export async function updateLearnerPreferences(userId: number, input: LearnerPreferenceUpdate): Promise<LearnerPreference | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await getLearnerPreferences(userId);
  await db.update(learnerPreferences).set(input).where(eq(learnerPreferences.userId, userId));
  const updated = await db.select().from(learnerPreferences).where(eq(learnerPreferences.userId, userId)).limit(1);
  return updated[0];
}

export async function recordSituationPractice(userId: number, situationId: string, score: number) {
  const db = await getDb();
  if (!db) return undefined;
  const existing = await db.select().from(situationPractice).where(and(eq(situationPractice.userId, userId), eq(situationPractice.situationId, situationId))).limit(1);
  const prior = existing[0];
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));
  const masteryScore = masteryScoreAfterAttempt(prior?.masteryScore ?? 0, safeScore);
  const now = new Date();
  const values = { masteryScore, attempts: (prior?.attempts ?? 0) + 1, lastPracticedAt: now, nextReviewAt: nextReviewAtForScore(safeScore, now) };
  if (prior) {
    await db.update(situationPractice).set(values).where(eq(situationPractice.id, prior.id));
  } else {
    await db.insert(situationPractice).values({ userId, situationId, ...values });
  }
  return { situationId, score: safeScore, ...values };
}

export async function getNextSituationPractice(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(situationPractice).where(eq(situationPractice.userId, userId)).orderBy(asc(situationPractice.nextReviewAt)).limit(1);
  return rows[0];
}

export async function getMicroMomentProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(microMomentProgress).where(eq(microMomentProgress.userId, userId));
}

export async function saveMicroMoment(userId: number, momentId: string, isSaved: boolean) {
  const db = await getDb();
  if (!db) return undefined;
  const current = await db.select().from(microMomentProgress).where(and(eq(microMomentProgress.userId, userId), eq(microMomentProgress.momentId, momentId))).limit(1);
  if (current[0]) {
    await db.update(microMomentProgress).set({ isSaved, lastSeenAt: new Date() }).where(eq(microMomentProgress.id, current[0].id));
  } else {
    await db.insert(microMomentProgress).values({ userId, momentId, isSaved });
  }
  return { momentId, isSaved };
}

export async function completeMicroMoment(userId: number, momentId: string, isCorrect: boolean) {
  const db = await getDb();
  if (!db) return undefined;
  const current = await db.select().from(microMomentProgress).where(and(eq(microMomentProgress.userId, userId), eq(microMomentProgress.momentId, momentId))).limit(1);
  const now = new Date();
  if (current[0]) {
    await db.update(microMomentProgress).set({ isCompleted: true, correctAttempts: current[0].correctAttempts + (isCorrect ? 1 : 0), lastSeenAt: now, completedAt: now }).where(eq(microMomentProgress.id, current[0].id));
  } else {
    await db.insert(microMomentProgress).values({ userId, momentId, isCompleted: true, correctAttempts: isCorrect ? 1 : 0, completedAt: now });
  }
  return { momentId, isCompleted: true, isCorrect };
}
