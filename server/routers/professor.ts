import { z } from "zod";
import { getDb } from "../db";
import { chatHistory } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { explanationLanguageName, getSituationById, TUTOR_IDS, TUTOR_PROFILES } from "../../shared/learningWorld";

export const PortugueseStyleEnum = z.enum(["slang", "casual", "informal", "formal", "diplomatic"]);
export type PortugueseStyle = z.infer<typeof PortugueseStyleEnum>;
const TutorEnum = z.enum(TUTOR_IDS);
const ExplanationLanguageEnum = z.enum(["ar", "tounsi", "pt", "en"]);

const styleDescriptions: Record<PortugueseStyle, string> = {
  slang:
    "Use authentic Portuguese street slang, gírias, and colloquial expressions as spoken by young people in Lisbon and Porto. Be raw and natural.",
  casual:
    "Use friendly, everyday spoken Portuguese — relaxed grammar, contractions, and natural conversation as among friends.",
  informal:
    "Use standard informal Portuguese — clear, natural, and approachable, suitable for everyday interactions.",
  formal:
    "Use polished, grammatically correct formal Portuguese appropriate for professional and academic contexts.",
  diplomatic:
    "Use elevated, literary, and highly refined Portuguese — the register of diplomacy, literature, and official discourse.",
};

const styleLabels: Record<PortugueseStyle, string> = {
  slang: "Slang",
  casual: "Casual",
  informal: "Informal",
  formal: "Formal",
  diplomatic: "Diplomatic",
};

export const professorRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        style: PortugueseStyleEnum.default("formal"),
        tutor: TutorEnum.default("roued"),
        explanationLanguage: ExplanationLanguageEnum.default("ar"),
        situationId: z.string().optional(),
        responseDepth: z.enum(["focused", "deep"]).default("focused"),
        conversationHistory: z
          .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
          .optional()
          .default([]),
      })
    )
    .mutation(async ({ input }) => {
      const { message, style, conversationHistory, tutor, explanationLanguage, situationId, responseDepth } = input;
      const profile = TUTOR_PROFILES[tutor];
      const situation = situationId ? getSituationById(situationId) : undefined;
      const outputLanguage = explanationLanguageName(explanationLanguage);

      const systemPrompt = `You are ${profile.name}, ${profile.role} at Prize2Pride. You accompany Tunisian learners as they build practical Portuguese from A1 to C2.

**Your Teaching Style:**
- Current register: ${styleDescriptions[style]}
- Explain in ${outputLanguage}; preserve Portuguese examples, then clarify their meaning in the learner's chosen explanation language.
- ${responseDepth === "deep" ? "Provide a comprehensive lesson-style answer with sectioned practice." : "Keep the response focused: explain, model, then give one useful micro-practice."}
- Use professional Markdown formatting:
  * **Bold** for key terms and concepts
  * \`inline code\` for Portuguese words, phrases, and examples
  * > Blockquotes for important notes, warnings, and cultural insights
  * Tables for verb conjugations, comparisons, and grammar patterns
  * Numbered and bulleted lists for rules and steps
  * ## Headings to organize long explanations

**Content Coverage:**
- Grammar rules with clear examples and exceptions
- Vocabulary with pronunciation guides (using IPA or phonetic spelling)
- Reading comprehension strategies
- Cultural notes about Portugal and Brazil
- Pronunciation tips (nasal vowels, silent letters, regional accents)
- Common mistakes learners make and how to avoid them
- Comparisons between European Portuguese (EP) and Brazilian Portuguese (BP) when relevant

**Situation grounding:**
${situation ? `The learner is practising “${situation.title}” at ${situation.level}. Their objective is to ${situation.goal} ${situation.context}. Use this as the central real-life setting.` : "When no situation is selected, ask one concise question before inventing a scenario."}

**Safety and learning integrity:**
- Never present uncertain Tunisian-dialect phrasing as authoritative. When uncertain, say so and offer Arabic or Portuguese clarification.
- Do not claim personal experiences, professional credentials, or real-time availability beyond this conversation.
- Be respectful, learner-focused, and non-judgmental.

**Personality:**
- Warm, encouraging, and patient
- Enthusiastic about the beauty of the Portuguese language
- Always provide practical, real-world examples
- End responses with a follow-up question or practice suggestion when appropriate

      Respond in the selected explanation language unless the learner asks for Portuguese-only immersion.`;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...conversationHistory.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user" as const, content: message },
      ];

      try {
        const response = await invokeLLM({
          model: "claude-opus-4-7",
          messages,
          max_tokens: responseDepth === "deep" ? 14000 : 4000,
        });
        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty response from LLM");
        const contentStr = typeof content === "string" ? content : JSON.stringify(content);
        return { content: contentStr, style };
      } catch (e) {
        console.error("[Professor Chat Error]", e);
        throw new Error(`Failed to get response from ${profile.shortName}`);
      }
    }),

  // Save chat to history (authenticated)
  saveHistory: protectedProcedure
    .input(
      z.object({
        userMessage: z.string(),
        assistantMessage: z.string(),
        style: PortugueseStyleEnum.default("formal"),
        topic: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return { success: false };
      try {
        await db.insert(chatHistory).values({
          userId: ctx.user!.id,
          userMessage: input.userMessage,
          assistantMessage: input.assistantMessage,
          style: input.style,
          topic: input.topic,
        });
        return { success: true };
      } catch (e) {
        console.error("[Chat History Save Error]", e);
        return { success: false };
      }
    }),

  // List available styles
  listStyles: publicProcedure.query(() => {
    return (Object.keys(styleDescriptions) as PortugueseStyle[]).map((key) => ({
      id: key,
      label: styleLabels[key],
      description: styleDescriptions[key],
    }));
  }),
});
