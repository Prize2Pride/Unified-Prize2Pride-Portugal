export type MicroLessonSource = {
  id: number;
  title: string;
  titlePt: string;
  level: string;
  topic: string;
  vocabulary: { word: string; translation: string; pronunciation: string; example?: string }[];
  dialogues: { speaker: string; text: string }[];
};

export type LearningMoment = {
  id: string;
  lessonId: number;
  level: string;
  topic: string;
  sourceLesson: string;
  kind: "word" | "reply";
  prompt: string;
  target: string;
  pronunciation: string;
  explanation: string;
  choices: string[];
  correctAnswer: string;
  example: string;
};

function distinct(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function createLearningMoments(lessons: MicroLessonSource[]): LearningMoment[] {
  return lessons.flatMap((lesson) => {
    const first = lesson.vocabulary[0];
    const second = lesson.vocabulary[1] ?? first;
    const vocabChoices = distinct(lesson.vocabulary.slice(0, 4).map((item) => item.translation));
    const dialogue = lesson.dialogues[0];
    if (!first || !dialogue) return [];
    return [
      {
        id: `moment-${lesson.id}-word`, lessonId: lesson.id, level: lesson.level, topic: lesson.topic, sourceLesson: lesson.titlePt,
        kind: "word", prompt: `What does “${first.word}” mean?`, target: first.word, pronunciation: first.pronunciation,
        explanation: first.translation, choices: vocabChoices, correctAnswer: first.translation, example: first.example || "Practise it in a short sentence.",
      },
      {
        id: `moment-${lesson.id}-reply`, lessonId: lesson.id, level: lesson.level, topic: lesson.topic, sourceLesson: lesson.titlePt,
        kind: "reply", prompt: `Listen to this real course dialogue and choose its meaning.`, target: dialogue.text, pronunciation: "Listen, pause, then repeat.",
        explanation: `A useful ${lesson.topic.toLowerCase()} moment from the existing lesson.`, choices: distinct([`A ${lesson.topic.toLowerCase()} exchange`, "A weather forecast", "A technical instruction"]), correctAnswer: `A ${lesson.topic.toLowerCase()} exchange`, example: `${dialogue.speaker}: ${dialogue.text}`,
      },
    ];
  });
}
