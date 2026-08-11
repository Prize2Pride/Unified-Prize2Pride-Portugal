export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export const TUTOR_IDS = ["roued", "chandra"] as const;
export type TutorId = (typeof TUTOR_IDS)[number];

export const EXPLANATION_LANGUAGES = ["ar", "tounsi", "pt", "en"] as const;
export type ExplanationLanguage = (typeof EXPLANATION_LANGUAGES)[number];

export const TUTOR_PROFILES: Record<TutorId, { id: TutorId; name: string; role: string; shortName: string; accent: string; description: string }> = {
  roued: {
    id: "roued",
    name: "Professor Roued El Fadhel",
    shortName: "Roued",
    role: "Principal Portuguese Tutor",
    accent: "emerald",
    description: "A patient, precise Portuguese mentor who helps learners connect Tunisian, Arabic, and Portuguese in practical situations.",
  },
  chandra: {
    id: "chandra",
    name: "Chandra",
    shortName: "Chandra",
    role: "Conversation and Confidence Tutor",
    accent: "violet",
    description: "A warm, confident adult tutor who helps learners turn vocabulary into clear, natural Portuguese conversations.",
  },
};

const SITUATION_PILLARS = [
  "Arrival and paperwork", "Housing and neighbourhood", "Work and career", "University and study", "Health and wellbeing", "Family and relationships", "Food and everyday shopping", "Travel and transport", "Money and public services", "Digital life and media", "Culture and leisure", "Entrepreneurship and clients", "Emergency and problem solving", "Nature and sustainability", "Hospitality and tourism", "Citizenship and community",
] as const;

const CONTEXTS = [
  "at an airport", "at a city office", "in a shared apartment", "at a job interview", "with a colleague", "at a clinic", "at a market", "in a restaurant", "on public transport", "at a university", "in a shop", "on a video call", "at a cultural event", "while resolving a problem",
] as const;

const GOALS = [
  "introduce yourself and your needs", "ask focused follow-up questions", "understand a fast practical reply", "explain a problem clearly", "make a respectful request", "negotiate a useful outcome",
] as const;

export type Situation = {
  id: string;
  index: number;
  level: CefrLevel;
  pillar: string;
  context: string;
  goal: string;
  title: string;
  learnerPrompt: string;
};

export const SITUATION_COUNT = SITUATION_PILLARS.length * CONTEXTS.length * GOALS.length * CEFR_LEVELS.length;

export function getSituationByIndex(index: number): Situation | undefined {
  if (!Number.isInteger(index) || index < 0 || index >= SITUATION_COUNT) return undefined;
  const levelIndex = index % CEFR_LEVELS.length;
  const goalIndex = Math.floor(index / CEFR_LEVELS.length) % GOALS.length;
  const contextIndex = Math.floor(index / (CEFR_LEVELS.length * GOALS.length)) % CONTEXTS.length;
  const pillarIndex = Math.floor(index / (CEFR_LEVELS.length * GOALS.length * CONTEXTS.length)) % SITUATION_PILLARS.length;
  const level = CEFR_LEVELS[levelIndex];
  const pillar = SITUATION_PILLARS[pillarIndex];
  const context = CONTEXTS[contextIndex];
  const goal = GOALS[goalIndex];
  return {
    id: `situation-${index + 1}`,
    index,
    level,
    pillar,
    context,
    goal,
    title: `${pillar}: ${context}`,
    learnerPrompt: `Practise how to ${goal} ${context}.`,
  };
}

export function getSituationById(id: string): Situation | undefined {
  const match = /^situation-(\d+)$/.exec(id);
  return match ? getSituationByIndex(Number(match[1]) - 1) : undefined;
}

export function getSituationPreview(limit = 12, offset = 0): Situation[] {
  return Array.from({ length: Math.max(0, Math.min(limit, SITUATION_COUNT - offset)) }, (_, position) => getSituationByIndex(offset + position)).filter((item): item is Situation => Boolean(item));
}

export function explanationLanguageName(language: ExplanationLanguage) {
  return { ar: "Arabic", tounsi: "Tunisian Arabic", pt: "Portuguese", en: "English" }[language];
}
