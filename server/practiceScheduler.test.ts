import { describe, expect, it } from "vitest";
import { masteryScoreAfterAttempt, nextReviewAtForScore } from "./practiceScheduler";

describe("adaptive situation practice scheduler", () => {
  it("schedules weaker attempts sooner than strong attempts", () => {
    const now = new Date("2026-08-11T10:00:00Z");
    expect(nextReviewAtForScore(40, now).toISOString()).toBe("2026-08-11T16:00:00.000Z");
    expect(nextReviewAtForScore(95, now).toISOString()).toBe("2026-08-18T10:00:00.000Z");
  });

  it("keeps mastery scores safely within an understandable 0–100 range", () => {
    expect(masteryScoreAfterAttempt(60, 80)).toBe(71);
    expect(masteryScoreAfterAttempt(0, 200)).toBe(55);
  });
});
