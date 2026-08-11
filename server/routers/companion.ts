import { z } from "zod";
import { completeMicroMoment, getLearnerPreferences, getMicroMomentProgress, getNextSituationPractice, recordSituationPractice, saveMicroMoment, updateLearnerPreferences } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { EXPLANATION_LANGUAGES, getSituationById, getSituationPreview, SITUATION_COUNT, TUTOR_IDS } from "../../shared/learningWorld";

const tutorEnum = z.enum(TUTOR_IDS);
const languageEnum = z.enum(EXPLANATION_LANGUAGES);
const immersionEnum = z.enum(["guided", "balanced", "immersive"]);

export const companionRouter = router({
  overview: publicProcedure.query(() => ({
    situationCount: SITUATION_COUNT,
    preview: getSituationPreview(8),
    tutorIds: TUTOR_IDS,
    explanationLanguages: EXPLANATION_LANGUAGES,
  })),
  situation: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => getSituationById(input.id) ?? null),
  preferences: protectedProcedure.query(({ ctx }) => getLearnerPreferences(ctx.user.id)),
  updatePreferences: protectedProcedure
    .input(z.object({
      tutor: tutorEnum.optional(),
      explanationLanguage: languageEnum.optional(),
      immersionMode: immersionEnum.optional(),
      dailyGoalMinutes: z.number().int().min(5).max(180).optional(),
    }))
    .mutation(({ ctx, input }) => updateLearnerPreferences(ctx.user.id, input)),
  recordPractice: protectedProcedure
    .input(z.object({ situationId: z.string().regex(/^situation-\d+$/), score: z.number().min(0).max(100) }))
    .mutation(({ ctx, input }) => recordSituationPractice(ctx.user.id, input.situationId, input.score)),
  nextPractice: protectedProcedure.query(async ({ ctx }) => {
    const scheduled = await getNextSituationPractice(ctx.user.id);
    const next = scheduled ? getSituationById(scheduled.situationId) : getSituationPreview(1)[0];
    return { situation: next ?? null, practice: scheduled ?? null };
  }),
  microProgress: protectedProcedure.query(({ ctx }) => getMicroMomentProgress(ctx.user.id)),
  saveMicroMoment: protectedProcedure.input(z.object({ momentId: z.string().min(1).max(64), isSaved: z.boolean() })).mutation(({ ctx, input }) => saveMicroMoment(ctx.user.id, input.momentId, input.isSaved)),
  completeMicroMoment: protectedProcedure.input(z.object({ momentId: z.string().min(1).max(64), isCorrect: z.boolean() })).mutation(({ ctx, input }) => completeMicroMoment(ctx.user.id, input.momentId, input.isCorrect)),
});
