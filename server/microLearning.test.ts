import { describe, expect, it } from "vitest";
import { createLearningMoments } from "../shared/microLearning";

describe("short-form learning moments", () => {
  it("converts existing lesson vocabulary and dialogue into active practice moments", () => {
    const moments = createLearningMoments([{ id: 9, title: "Greetings", titlePt: "Saudações", level: "A1", topic: "Greetings", vocabulary: [{ word: "Olá", translation: "Hello", pronunciation: "oh-LAH", example: "Olá!" }, { word: "Tchau", translation: "Bye", pronunciation: "chow" }], dialogues: [{ speaker: "A", text: "Olá!" }] }]);
    expect(moments).toHaveLength(2);
    expect(moments[0]).toMatchObject({ id: "moment-9-word", correctAnswer: "Hello" });
    expect(moments[1]).toMatchObject({ id: "moment-9-reply", kind: "reply" });
  });
});
