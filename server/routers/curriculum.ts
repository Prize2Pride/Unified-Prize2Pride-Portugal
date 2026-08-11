import { z } from "zod";
import { CURRICULUM_LEVELS, curriculumStats, getLessonByCurriculumId, listCurriculumLessons } from "../../shared/tenThousandCurriculum";
import { publicProcedure, router } from "../_core/trpc";

const levelEnum = z.enum(CURRICULUM_LEVELS);

export const curriculumRouter = router({
  stats: publicProcedure.query(() => curriculumStats()),
  list: publicProcedure.input(z.object({ level: levelEnum.optional(), offset: z.number().int().min(0).optional(), limit: z.number().int().min(1).max(48).optional(), query: z.string().max(100).optional() }).optional()).query(({ input }) => listCurriculumLessons(input || {})),
  lesson: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => getLessonByCurriculumId(input.id) ?? null),
});
