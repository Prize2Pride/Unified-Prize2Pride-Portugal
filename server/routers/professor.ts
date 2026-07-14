import { z } from "zod";
import { getDb } from "../db";
import { chatHistory } from "../../drizzle/schema";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

export const PortugueseStyleEnum = z.enum(["slang", "casual", "informal", "formal", "diplomatic"]);
export type PortugueseStyle = z.infer<typeof PortugueseStyleEnum>;

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
        conversationHistory: z
          .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
          .optional()
          .default([]),
      })
    )
    .mutation(async ({ input }) => {
      const { message, style, conversationHistory } = input;

      const systemPrompt = `You are Professor Carlos, an expert Portuguese language teacher dedicated to helping learners at all levels from A1 to C2.

**Your Teaching Style:**
- Current register: ${styleDescriptions[style]}
- Provide detailed, comprehensive explanations — never truncate answers
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

**Personality:**
- Warm, encouraging, and patient
- Enthusiastic about the beauty of the Portuguese language
- Always provide practical, real-world examples
- End responses with a follow-up question or practice suggestion when appropriate

Respond in English unless the learner writes in Portuguese, in which case respond in Portuguese.`;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...conversationHistory.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user" as const, content: message },
      ];

      try {
        const response = await invokeLLM({
          model: "claude-opus-4-7",
          messages,
          max_tokens: 16000,
        });
        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty response from LLM");
        const contentStr = typeof content === "string" ? content : JSON.stringify(content);
        return { content: contentStr, style };
      } catch (e) {
        console.error("[Professor Chat Error]", e);
        throw new Error("Failed to get response from Professor Carlos");
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
