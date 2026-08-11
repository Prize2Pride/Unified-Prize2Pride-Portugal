import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { explanationLanguageName, getSituationById } from "../../shared/learningWorld";

export const courseGeneratorRouter = router({
  // Generate a full lesson on any Portuguese topic
  generateLesson: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1),
        level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).default("A1"),
        language: z.enum(["en", "pt", "ar", "tounsi"]).default("en"),
        situationId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const situation = input.situationId ? getSituationById(input.situationId) : undefined;
      const prompt = `You are an expert Portuguese language curriculum designer for Prize2Pride. Generate a complete, detailed lesson draft with safe, reviewable sections.

TOPIC: ${input.topic}
LEVEL: ${input.level}
EXPLANATION LANGUAGE: ${explanationLanguageName(input.language)}
${situation ? `SITUATION: ${situation.title}; learner goal: ${situation.goal} ${situation.context}.` : "SITUATION: Create one concrete, real-life Portuguese situation appropriate to the topic."}

Generate a comprehensive lesson containing:
1. **Lesson Title** (in English and Portuguese)
2. **Learning Objectives** (3-5 clear goals)
3. **Vocabulary** — 15 key words with: Portuguese word, translation in the explanation language, IPA pronunciation, example sentence
4. **Grammar Explanation** — detailed rules with examples, tables for conjugations/patterns, common exceptions
5. **Reading Comprehension Text** — 250+ word authentic-style passage in Portuguese
6. **Translation** of the reading passage in the explanation language
7. **Dialogues** — 2 realistic dialogues (4-6 lines each) between speakers A and B
8. **Quiz Questions** — 8 questions mixing multiple-choice and true/false
9. **Cultural Notes** — 2-3 interesting cultural facts related to the topic
10. **Pronunciation Tips** — specific guidance for sounds in this lesson
11. **Common Mistakes** — 3 mistakes learners make and corrections

12. **Tutor Review Notes** — content assumptions, regional variation, and facts requiring a human curriculum review

Format the response as clean, well-structured Markdown. Do not invent citations, proficiency claims, or cultural facts; flag any uncertain item in Tutor Review Notes.`;

      const response = await invokeLLM({
        model: "claude-opus-4-7",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 16000,
      });
      const content = response.choices[0]?.message?.content;
      return {
        topic: input.topic,
        level: input.level,
        content: typeof content === "string" ? content : JSON.stringify(content),
        generatedAt: new Date(),
      };
    }),

  // Generate targeted exercises on any topic
  generateExercises: publicProcedure
    .input(
      z.object({
        topic: z.string().min(1),
        exerciseType: z.enum(["vocabulary", "grammar", "conversation", "writing"]).default("grammar"),
        level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).default("A1"),
        exerciseCount: z.number().min(1).max(20).default(10),
      })
    )
    .mutation(async ({ input }) => {
      const typeInstructions: Record<string, string> = {
        vocabulary: "Fill-in-the-blank with word banks, word matching, multiple-choice vocabulary questions",
        grammar: "Conjugation exercises, sentence transformation, grammar correction, fill-in-the-blank",
        conversation: "Dialogue completion, role-play scenarios, response generation",
        writing: "Sentence writing prompts, paragraph composition, creative writing starters",
      };

      const prompt = `You are an expert Portuguese language teacher. Generate ${input.exerciseCount} interactive ${input.exerciseType} exercises.

TOPIC: ${input.topic}
LEVEL: ${input.level}
EXERCISE TYPE: ${input.exerciseType}
EXERCISE FORMATS: ${typeInstructions[input.exerciseType]}

For each exercise provide:
- Clear numbered title and instructions
- The exercise itself (in Portuguese where appropriate)
- Answer key with explanations
- Difficulty indicator (Easy/Medium/Hard)
- A tip or cultural note where relevant

Format as clean Markdown. Make exercises practical and immediately usable.`;

      const response = await invokeLLM({
        model: "mistral-7b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 12000,
      });
      const content = response.choices[0]?.message?.content;
      return {
        topic: input.topic,
        exerciseType: input.exerciseType,
        level: input.level,
        exerciseCount: input.exerciseCount,
        content: typeof content === "string" ? content : JSON.stringify(content),
        generatedAt: new Date(),
      };
    }),

  // Generate cultural knowledge about Portugal/Brazil
  generateKnowledge: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        depth: z.enum(["brief", "detailed", "comprehensive"]).default("detailed"),
      })
    )
    .mutation(async ({ input }) => {
      const depthMap = {
        brief: "2-3 concise paragraphs",
        detailed: "5-7 detailed paragraphs with examples and context",
        comprehensive: "10+ paragraphs covering history, culture, language, and practical applications",
      };

      const prompt = `You are an expert on Portuguese language, culture, and history (covering both Portugal and Brazil).

QUESTION: ${input.query}
DEPTH: ${depthMap[input.depth]}

Provide:
- Clear, well-structured answer in Markdown
- Historical and cultural context
- Language examples where relevant (Portuguese words/phrases with translations)
- Interesting facts and insights
- Practical applications for language learners
- Differences between European and Brazilian Portuguese where applicable

Be engaging, accurate, and educational.`;

      const response = await invokeLLM({
        model: "neural-chat-7b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 16000,
      });
      const content = response.choices[0]?.message?.content;
      return {
        query: input.query,
        depth: input.depth,
        content: typeof content === "string" ? content : JSON.stringify(content),
        generatedAt: new Date(),
      };
    }),
});
