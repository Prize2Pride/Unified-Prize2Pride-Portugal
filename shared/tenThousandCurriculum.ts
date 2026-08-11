export const CURRICULUM_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CurriculumLevel = (typeof CURRICULUM_LEVELS)[number];

export const LESSONS_PER_LEVEL: Record<CurriculumLevel, number> = { A1: 1400, A2: 1600, B1: 1800, B2: 1800, C1: 1700, C2: 1700 };
export const TOTAL_CURRICULUM_LESSONS = Object.values(LESSONS_PER_LEVEL).reduce((sum, count) => sum + count, 0);

type Domain = { name: string; label: string; description: string };
const DOMAINS: Domain[] = [
  { name: "arrival", label: "Arrival and first days", description: "transport, first contacts, and getting oriented" },
  { name: "home", label: "Home and neighbourhood", description: "housing, neighbours, repairs, and daily routines" },
  { name: "food", label: "Food and everyday shopping", description: "markets, cafés, restaurants, and practical choices" },
  { name: "health", label: "Health and wellbeing", description: "appointments, symptoms, habits, and support" },
  { name: "education", label: "Study and education", description: "classes, assignments, feedback, and academic life" },
  { name: "work", label: "Workplace essentials", description: "colleagues, meetings, tasks, and workplace communication" },
  { name: "career", label: "Career and professional growth", description: "job search, interviews, projects, and negotiation" },
  { name: "public-services", label: "Public services and paperwork", description: "forms, appointments, rules, and civic processes" },
  { name: "money", label: "Money and consumer life", description: "payments, banking, budgets, and solving purchases" },
  { name: "mobility", label: "Travel and mobility", description: "tickets, journeys, accommodation, and route changes" },
  { name: "digital", label: "Digital life", description: "messages, accounts, help requests, and online etiquette" },
  { name: "family", label: "Family and relationships", description: "plans, care, celebrations, and everyday connection" },
  { name: "community", label: "Community and participation", description: "events, volunteering, shared decisions, and local life" },
  { name: "culture", label: "Culture and leisure", description: "music, film, books, sport, and creative activities" },
  { name: "hospitality", label: "Hospitality and tourism", description: "serving guests, recommendations, reservations, and service recovery" },
  { name: "business", label: "Business and entrepreneurship", description: "clients, proposals, operations, and practical problem-solving" },
  { name: "environment", label: "Environment and sustainable choices", description: "resources, transport, neighbourhood action, and informed choices" },
  { name: "emergency", label: "Urgent and unexpected moments", description: "asking for help, explaining an issue, and making safe decisions" },
  { name: "media", label: "Media and public conversation", description: "understanding information, checking claims, and sharing views" },
  { name: "advanced", label: "Advanced professional and academic discourse", description: "argumentation, mediation, research, and high-stakes communication" },
];

const SITUATION_FRAMES = [
  "first contact", "asking for clarification", "following a routine", "making a request", "solving a small problem", "explaining a preference", "planning together", "giving and receiving feedback", "handling a change", "making a comparison", "negotiating a solution", "reflecting on an outcome",
] as const;

const LEVEL_ACTIONS: Record<CurriculumLevel, string> = {
  A1: "recognise familiar information and produce a short supported response",
  A2: "handle a routine exchange and connect simple ideas",
  B1: "explain experiences, preferences, and practical reasons in connected language",
  B2: "participate with increasing precision, detail, and register awareness",
  C1: "adapt language flexibly for complex personal, academic, and professional purposes",
  C2: "mediate nuanced ideas with controlled style and strategic precision",
};

export type FourSkillTasks = { listening: string; reading: string; writing: string; speaking: string };
export type CurriculumLesson = {
  id: string;
  level: CurriculumLevel;
  sequence: number;
  unit: number;
  domain: string;
  domainLabel: string;
  situation: string;
  title: string;
  objective: string;
  skills: FourSkillTasks;
  editorialStatus: "template";
};

function numericId(level: CurriculumLevel, sequence: number) { return `${level}-L${String(sequence).padStart(4, "0")}`; }

export function getCurriculumLesson(level: CurriculumLevel, sequence: number): CurriculumLesson | undefined {
  const count = LESSONS_PER_LEVEL[level];
  if (!Number.isInteger(sequence) || sequence < 1 || sequence > count) return undefined;
  const index = sequence - 1;
  const domain = DOMAINS[index % DOMAINS.length];
  const situation = SITUATION_FRAMES[Math.floor(index / DOMAINS.length) % SITUATION_FRAMES.length];
  const unit = Math.floor(index / 20) + 1;
  const objective = `In ${domain.description}, the learner can ${LEVEL_ACTIONS[level]} during ${situation}.`;
  return {
    id: numericId(level, sequence), level, sequence, unit, domain: domain.name, domainLabel: domain.label, situation,
    title: `${domain.label}: ${situation}`,
    objective,
    skills: {
      listening: `Listen to an original Portuguese ${domain.name} exchange and identify the practical action or key detail needed for ${situation}.`,
      reading: `Read a level-appropriate ${domain.name} message, notice, form, or dialogue and locate the information needed to act.`,
      writing: `Write a ${level === "A1" ? "short supported" : level === "A2" ? "clear connected" : "purposeful"} Portuguese response for ${situation}, with an explicit audience and outcome.`,
      speaking: `Rehearse and record or role-play a Portuguese response for ${situation}; compare it with a tutor model and improve one detail.`,
    },
    editorialStatus: "template",
  };
}

export function getLessonByCurriculumId(id: string) {
  const match = /^(A1|A2|B1|B2|C1|C2)-L(\d{4})$/.exec(id);
  return match ? getCurriculumLesson(match[1] as CurriculumLevel, Number(match[2])) : undefined;
}

export function listCurriculumLessons(input: { level?: CurriculumLevel; offset?: number; limit?: number; query?: string }) {
  const levels = input.level ? [input.level] : CURRICULUM_LEVELS;
  const query = input.query?.trim().toLowerCase() || "";
  const items = levels.flatMap((level) => Array.from({ length: LESSONS_PER_LEVEL[level] }, (_, index) => getCurriculumLesson(level, index + 1)!)).filter((lesson) => !query || `${lesson.title} ${lesson.objective} ${lesson.domainLabel}`.toLowerCase().includes(query));
  const offset = Math.max(0, input.offset ?? 0);
  const limit = Math.max(1, Math.min(48, input.limit ?? 24));
  return { total: items.length, items: items.slice(offset, offset + limit) };
}

export function curriculumStats() {
  return { total: TOTAL_CURRICULUM_LESSONS, levels: CURRICULUM_LEVELS.map((level) => ({ level, lessons: LESSONS_PER_LEVEL[level] })), domains: DOMAINS.map((domain) => ({ name: domain.name, label: domain.label })) };
}
