import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM, listLLMModels } from "../_core/llm";
import { PortugueseStyleEnum } from "./professor";

const styleDescriptions: Record<string, string> = {
  slang: "Use authentic Portuguese street slang and gírias",
  casual: "Use friendly, relaxed everyday Portuguese",
  informal: "Use natural, approachable informal Portuguese",
  formal: "Use polished, professional formal Portuguese",
  diplomatic: "Use elevated, literary, diplomatic Portuguese",
};

export const publicChatRouter = router({
  // Unlimited public chat — no restrictions
  chat: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        style: PortugueseStyleEnum.default("formal"),
        model: z.string().default("llama-2-70b"),
        conversationHistory: z
          .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
          .optional()
          .default([]),
        maxTokens: z.number().default(32000),
      })
    )
    .mutation(async ({ input }) => {
      const { message, style, model, conversationHistory, maxTokens } = input;

      const systemPrompt = `You are Professor Carlos, an expert Portuguese language teacher.

**Teaching Register:** ${styleDescriptions[style]}

**Instructions:**
- Provide comprehensive, detailed explanations with no length restrictions
- Use Markdown formatting: **bold** for key terms, \`code\` for Portuguese words, tables for conjugations
- Include pronunciation guides, cultural notes, and practical examples
- Cover both European Portuguese (EP) and Brazilian Portuguese (BP) differences when relevant
- Be warm, encouraging, and thorough
- Respond in English unless the learner writes in Portuguese`;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...conversationHistory.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        { role: "user" as const, content: message },
      ];

      try {
        const response = await invokeLLM({
          model,
          messages,
          max_tokens: maxTokens,
        });
        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error("Empty response from LLM");
        const contentStr = typeof content === "string" ? content : JSON.stringify(content);
        return { content: contentStr, style, model };
      } catch (e) {
        console.error("[Public Chat Error]", e);
        throw new Error("Failed to get chat response");
      }
    }),

  // List available LLM models
  listModels: publicProcedure.query(async () => {
    try {
      const result = await listLLMModels();
      const models = result.data ?? [];
      return models.map((m: any) => ({
        id: m.id ?? m.name,
        name: m.name ?? m.id,
        description: m.description ?? "",
      }));
    } catch (e) {
      console.error("[List Models Error]", e);
      // Fallback model list
      return [
        { id: "llama-2-70b", name: "Llama 2 70B", description: "Fast and capable open model" },
        { id: "claude-opus-4-7", name: "Claude Opus", description: "Most capable model for complex explanations" },
        { id: "mistral-7b", name: "Mistral 7B", description: "Lightweight and fast" },
        { id: "neural-chat-7b", name: "Neural Chat 7B", description: "Conversational model" },
      ];
    }
  }),
});
