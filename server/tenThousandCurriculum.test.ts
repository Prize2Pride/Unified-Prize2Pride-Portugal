import { describe, expect, it } from "vitest";
import { curriculumStats, getCurriculumLesson, listCurriculumLessons, TOTAL_CURRICULUM_LESSONS } from "../shared/tenThousandCurriculum";

describe("10,000 lesson four-skill curriculum", () => {
  it("has exactly 10,000 level-distributed lessons", () => {
    expect(TOTAL_CURRICULUM_LESSONS).toBe(10000);
    expect(curriculumStats().levels.reduce((sum, item) => sum + item.lessons, 0)).toBe(10000);
  });

  it("gives every generated lesson all four language-skill actions", () => {
    const lesson = getCurriculumLesson("B2", 720);
    expect(lesson?.id).toBe("B2-L0720");
    expect(Object.values(lesson?.skills || {})).toHaveLength(4);
    expect(Object.values(lesson?.skills || {}).every(Boolean)).toBe(true);
  });

  it("supports bounded catalog browsing without materialising lesson content outside the requested page", () => {
    const page = listCurriculumLessons({ level: "A1", offset: 1390, limit: 24 });
    expect(page.total).toBe(1400);
    expect(page.items).toHaveLength(10);
    expect(page.items[0].id).toBe("A1-L1391");
  });
});
