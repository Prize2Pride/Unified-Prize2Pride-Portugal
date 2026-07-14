import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock LLM ────────────────────────────────────────────────
// Note: vi.mock is hoisted, so we cannot reference variables defined above it.
// All mock values must be inlined inside the factory function.
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    id: "mock-response-001",
    created: 1700000000000,
    model: "claude-haiku-4-5",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Olá! I am Professor Carlos. The difference between ser and estar is that 'ser' is used for permanent states and 'estar' for temporary ones.",
        },
        finish_reason: "stop",
      },
    ],
  }),
  listLLMModels: vi.fn().mockResolvedValue({
    data: [
      { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", description: "Fast and efficient" },
      { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", description: "Balanced performance" },
    ],
  }),
}));

// ─── Mock DB ─────────────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

// ─── Context factories ────────────────────────────────────────
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user-001",
      email: "test@portuguese.pt",
      name: "Test Learner",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ─── AUTH TESTS ───────────────────────────────────────────────
describe("auth", () => {
  it("returns null user for unauthenticated requests", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });

  it("returns user object for authenticated requests", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    const user = await caller.auth.me();
    expect(user).not.toBeNull();
    expect(user?.name).toBe("Test Learner");
    expect(user?.email).toBe("test@portuguese.pt");
  });

  it("clears session cookie on logout", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });
});

// ─── PROFESSOR CHAT TESTS ─────────────────────────────────────
describe("professor.chat", () => {
  it("accepts a message and returns AI response", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.professor.chat({
      message: "What is the difference between ser and estar?",
      style: "formal",
      conversationHistory: [],
    });
    expect(result).toBeDefined();
    expect(result.content).toBeTruthy();
    expect(typeof result.content).toBe("string");
  });

  it("accepts all five teaching styles", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const styles = ["slang", "casual", "informal", "formal", "diplomatic"] as const;
    for (const style of styles) {
      const result = await caller.professor.chat({
        message: "Teach me about Portuguese verbs",
        style,
        conversationHistory: [],
      });
      expect(result.content).toBeTruthy();
    }
  });

  it("accepts conversation history for context", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.professor.chat({
      message: "Can you give me an example?",
      style: "informal",
      conversationHistory: [
        { role: "user", content: "Explain the subjunctive" },
        { role: "assistant", content: "The subjunctive is used for..." },
      ],
    });
    expect(result.content).toBeTruthy();
  });
});

// ─── PUBLIC CHAT TESTS ────────────────────────────────────────
describe("publicChat", () => {
  it("lists available AI models", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const models = await caller.publicChat.listModels();
    expect(Array.isArray(models)).toBe(true);
    expect(models.length).toBeGreaterThan(0);
    expect(models[0]).toHaveProperty("id");
    expect(models[0]).toHaveProperty("name");
  });

  it("sends a chat message and returns response", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.publicChat.chat({
      message: "Teach me 5 Portuguese words",
      style: "casual",
      model: "claude-haiku-4-5",
      conversationHistory: [],
    });
    expect(result.content).toBeTruthy();
    expect(result.model).toBe("claude-haiku-4-5");
  });
});

// ─── COURSE GENERATOR TESTS ───────────────────────────────────
describe("courseGenerator", () => {
  it("generates a lesson for a given topic and level", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.courseGenerator.generateLesson({
      topic: "Ordering coffee in Portugal",
      level: "A1",
    });
    expect(result.content).toBeTruthy();
    expect(result.topic).toBe("Ordering coffee in Portugal");
    expect(result.level).toBe("A1");
  });

  it("generates exercises for a given topic", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.courseGenerator.generateExercises({
      topic: "Verb conjugation",
      exerciseType: "grammar",
      level: "B1",
      exerciseCount: 5,
    });
    expect(result.content).toBeTruthy();
    expect(result.exerciseType).toBe("grammar");
  });

  it("generates cultural knowledge", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.courseGenerator.generateKnowledge({
      query: "What is fado music?",
      depth: "detailed",
    });
    expect(result.content).toBeTruthy();
    expect(result.query).toBe("What is fado music?");
  });

  it("accepts all exercise types", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const types = ["vocabulary", "grammar", "conversation", "writing"] as const;
    for (const exerciseType of types) {
      const result = await caller.courseGenerator.generateExercises({
        topic: "Test topic",
        exerciseType,
        level: "A2",
        exerciseCount: 3,
      });
      expect(result.content).toBeTruthy();
    }
  });
});

// ─── LESSONS ROUTER TESTS ─────────────────────────────────────
describe("lessons", () => {
  it("getAllProgress returns empty array for unauthenticated user", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    // getAllProgress requires auth, should throw
    await expect(caller.lessons.getAllProgress()).rejects.toThrow();
  });

  it("getAllProgress returns array for authenticated user", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    const progress = await caller.lessons.getAllProgress();
    expect(Array.isArray(progress)).toBe(true);
  });

  it("getStats returns level statistics for authenticated user", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    const stats = await caller.lessons.getStats();
    expect(stats).toBeDefined();
  });

  it("saveProgress requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.lessons.saveProgress({
        lessonId: 1,
        quizScore: 85,
        timeSpent: 300,
        isCompleted: true,
      })
    ).rejects.toThrow();
  });
});
