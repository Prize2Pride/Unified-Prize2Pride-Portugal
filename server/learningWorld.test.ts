import { describe, expect, it } from "vitest";
import { getSituationById, getSituationByIndex, getSituationPreview, SITUATION_COUNT, TUTOR_PROFILES } from "../shared/learningWorld";

describe("Prize2Pride learning world", () => {
  it("exposes more than one thousand deterministic Portuguese practice situations", () => {
    expect(SITUATION_COUNT).toBeGreaterThan(1000);
    expect(getSituationByIndex(0)?.id).toBe("situation-1");
    expect(getSituationByIndex(SITUATION_COUNT - 1)?.level).toBe("C2");
    expect(getSituationByIndex(SITUATION_COUNT)).toBeUndefined();
  });

  it("resolves situation identifiers and retains both tutor profiles", () => {
    expect(getSituationById("situation-120")?.index).toBe(119);
    expect(getSituationPreview(5)).toHaveLength(5);
    expect(TUTOR_PROFILES.roued.name).toContain("Roued");
    expect(TUTOR_PROFILES.chandra.role).toContain("Confidence");
  });
});
