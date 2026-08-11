import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve(process.cwd(), "exports", "prize2pride-10000-situations-v1");
const levels = [
  ["A1", 1400, "recognise familiar information and give a short supported response"],
  ["A2", 1600, "manage a routine exchange and connect simple ideas"],
  ["B1", 1800, "explain experiences, preferences, and practical reasons in connected language"],
  ["B2", 1800, "participate with increasing detail, precision, and register awareness"],
  ["C1", 1700, "adapt language flexibly for complex personal, academic, and professional purposes"],
  ["C2", 1700, "mediate nuanced ideas with controlled style and strategic precision"],
];

const domains = [
  ["Arrival and first days", "Chegada e primeiros dias", "transport, directions, orientation, and first contacts", "transportes, orientações, adaptação e primeiros contactos"],
  ["Home and neighbourhood", "Casa e bairro", "housing, repairs, neighbours, and routines", "habitação, reparações, vizinhos e rotinas"],
  ["Food and everyday shopping", "Alimentação e compras diárias", "markets, cafés, restaurants, and practical choices", "mercados, cafés, restaurantes e escolhas práticas"],
  ["Health and wellbeing", "Saúde e bem-estar", "appointments, symptoms, habits, and support", "consultas, sintomas, hábitos e apoio"],
  ["Study and education", "Estudo e educação", "classes, assignments, feedback, and academic life", "aulas, trabalhos, feedback e vida académica"],
  ["Workplace essentials", "Vida profissional", "colleagues, meetings, tasks, and workplace communication", "colegas, reuniões, tarefas e comunicação profissional"],
  ["Career and professional growth", "Carreira e crescimento profissional", "job search, interviews, projects, and negotiation", "procura de emprego, entrevistas, projetos e negociação"],
  ["Public services and paperwork", "Serviços públicos e documentação", "forms, appointments, rules, and civic processes", "formulários, marcações, regras e processos cívicos"],
  ["Money and consumer life", "Dinheiro e consumo", "payments, banking, budgets, and solving purchases", "pagamentos, banca, orçamentos e resolução de compras"],
  ["Travel and mobility", "Viagens e mobilidade", "tickets, journeys, accommodation, and route changes", "bilhetes, viagens, alojamento e alterações de percurso"],
  ["Digital life", "Vida digital", "messages, accounts, technical help, and online etiquette", "mensagens, contas, apoio técnico e etiqueta online"],
  ["Family and relationships", "Família e relações", "plans, care, celebrations, and everyday connection", "planos, cuidados, celebrações e ligação quotidiana"],
  ["Community and participation", "Comunidade e participação", "events, volunteering, shared decisions, and local life", "eventos, voluntariado, decisões partilhadas e vida local"],
  ["Culture and leisure", "Cultura e lazer", "music, books, sport, film, and creative activities", "música, livros, desporto, cinema e atividades criativas"],
  ["Hospitality and tourism", "Hospitalidade e turismo", "guest care, recommendations, reservations, and service recovery", "acolhimento, recomendações, reservas e recuperação de serviço"],
  ["Business and entrepreneurship", "Negócios e empreendedorismo", "clients, proposals, operations, and problem-solving", "clientes, propostas, operações e resolução de problemas"],
  ["Environment and sustainable choices", "Ambiente e escolhas sustentáveis", "resources, transport, neighbourhood action, and responsible choices", "recursos, transportes, ação local e escolhas responsáveis"],
  ["Urgent and unexpected moments", "Momentos urgentes e imprevistos", "asking for help, explaining an issue, and acting safely", "pedir ajuda, explicar uma situação e agir com segurança"],
  ["Media and public conversation", "Media e conversa pública", "understanding information, checking claims, and sharing views", "compreender informação, verificar afirmações e partilhar opiniões"],
  ["Advanced professional and academic discourse", "Discurso profissional e académico avançado", "argumentation, mediation, research, and high-stakes communication", "argumentação, mediação, investigação e comunicação de alto impacto"],
];

const roles = [
  ["a new resident", "uma pessoa recém-chegada"], ["a traveller", "uma pessoa viajante"], ["a student", "uma estudante"], ["a job applicant", "uma pessoa candidata a emprego"], ["a colleague", "uma colega"],
  ["a parent or caregiver", "uma pessoa cuidadora"], ["a customer", "uma cliente"], ["a tenant", "uma inquilina"], ["a patient", "uma pessoa utente"], ["a neighbour", "uma vizinha"],
  ["a volunteer", "uma pessoa voluntária"], ["a small-business owner", "uma pequena empreendedora"], ["a guest", "uma pessoa convidada"], ["a service user", "uma utilizadora de serviços"], ["a project participant", "uma participante de projeto"],
  ["a researcher", "uma investigadora"], ["a team coordinator", "uma coordenadora de equipa"], ["a community organiser", "uma organizadora comunitária"], ["a client", "uma cliente profissional"], ["a lifelong learner", "uma pessoa aprendente"],
];

const actions = [
  ["make a first contact and state an immediate need", "faz o primeiro contacto e explica uma necessidade imediata"],
  ["ask for clarification before making a decision", "pede esclarecimentos antes de tomar uma decisão"],
  ["follow a routine and confirm the essential details", "segue uma rotina e confirma os dados essenciais"],
  ["make a respectful request with a clear outcome", "faz um pedido respeitoso com um resultado claro"],
  ["explain a small problem and ask for a solution", "explica um pequeno problema e pede uma solução"],
  ["describe a preference and compare two options", "descreve uma preferência e compara duas opções"],
  ["plan a next step with another person", "combina o próximo passo com outra pessoa"],
  ["give and receive practical feedback", "dá e recebe feedback prático"],
  ["handle a change to an agreed plan", "lida com uma alteração a um plano combinado"],
  ["check an important detail before acting", "verifica um dado importante antes de agir"],
  ["negotiate a fair and realistic solution", "negocia uma solução justa e realista"],
  ["summarise what happened and what is needed next", "resume o que aconteceu e o que é necessário a seguir"],
  ["explain a reason, constraint, and preferred outcome", "explica uma razão, uma limitação e o resultado pretendido"],
  ["respond to an unexpected question calmly", "responde com calma a uma pergunta inesperada"],
  ["make a recommendation with supporting reasons", "faz uma recomendação com razões de apoio"],
  ["resolve a misunderstanding without blaming anyone", "resolve um mal-entendido sem culpar ninguém"],
  ["adapt the register for a formal audience", "adapta o registo a um público formal"],
  ["mediate two different viewpoints", "medeia dois pontos de vista diferentes"],
  ["identify a risk and propose a safe action", "identifica um risco e propõe uma ação segura"],
  ["reflect on the result and suggest an improvement", "reflete sobre o resultado e sugere uma melhoria"],
  ["organise information into a clear sequence", "organiza informação numa sequência clara"],
  ["respond to a service issue with tact", "responde com tato a uma questão de serviço"],
  ["defend a choice while acknowledging another view", "defende uma escolha reconhecendo outro ponto de vista"],
  ["coordinate a shared task under a time limit", "coordena uma tarefa partilhada com limite de tempo"],
  ["close the interaction with a clear confirmation", "termina a interação com uma confirmação clara"],
];

const headers = ["lesson_id", "global_index", "cefr_level", "level_sequence", "domain", "domain_pt", "role", "role_pt", "situation_action", "situation_action_pt", "topic_title", "topic_title_pt", "learner_objective", "listening_task", "reading_task", "writing_task", "speaking_task", "content_status", "source_note", "curriculum_version"];

function quoteCsv(value) { const text = String(value ?? ""); return /[",\n]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text; }
function recordFor(globalIndex, level, levelSequence, levelCapability) {
  const [domain, domainPt, domainContext, domainContextPt] = domains[Math.floor(globalIndex / (roles.length * actions.length)) % domains.length];
  const [role, rolePt] = roles[Math.floor(globalIndex / actions.length) % roles.length];
  const [action, actionPt] = actions[globalIndex % actions.length];
  const lessonId = `P2P-${level}-${String(levelSequence).padStart(4, "0")}`;
  const title = `${domain}: ${role} — ${action}`;
  const titlePt = `${domainPt}: ${rolePt} ${actionPt}`;
  return {
    lesson_id: lessonId,
    global_index: globalIndex + 1,
    cefr_level: level,
    level_sequence: levelSequence,
    domain,
    domain_pt: domainPt,
    role,
    role_pt: rolePt,
    situation_action: action,
    situation_action_pt: actionPt,
    topic_title: title,
    topic_title_pt: titlePt,
    learner_objective: `Within ${domainContext}, ${role} can ${levelCapability} while they ${action}.`,
    listening_task: `Listen to an original Portuguese exchange about ${title.toLowerCase()}. Identify the practical action, one key detail, and the speaker's intended next step.`,
    reading_task: `Read an editor-approved Portuguese message, notice, form, or dialogue for ${title.toLowerCase()}. Find the information that changes what ${role} should do.`,
    writing_task: `Write a Portuguese response for ${title.toLowerCase()}, adapting length and register to ${level}. Include a purpose, the essential detail, and a clear next action.`,
    speaking_task: `Role-play ${title.toLowerCase()} in Portuguese. Rehearse a model, respond to one follow-up question, and improve one phrase after reflection.`,
    content_status: "original_curriculum_source_needs_editorial_review",
    source_note: "Original Prize2Pride situation metadata. External frameworks informed CEFR alignment only; no third-party lesson text is reproduced.",
    curriculum_version: "2026.1",
  };
}

function validate(records) {
  const ids = new Set(records.map((record) => record.lesson_id));
  const titles = new Set(records.map((record) => record.topic_title));
  if (records.length !== 10000) throw new Error(`Expected 10000 records, received ${records.length}`);
  if (ids.size !== 10000) throw new Error("Lesson ID duplication detected");
  if (titles.size !== 10000) throw new Error("Topic title duplication detected");
  for (const record of records) {
    for (const key of ["listening_task", "reading_task", "writing_task", "speaking_task"]) if (!record[key]?.trim()) throw new Error(`Missing ${key} for ${record.lesson_id}`);
  }
  return Object.fromEntries(levels.map(([level, count]) => [level, records.filter((record) => record.cefr_level === level).length === count]));
}

const records = [];
let globalIndex = 0;
for (const [level, count, capability] of levels) {
  for (let sequence = 1; sequence <= count; sequence += 1) {
    records.push(recordFor(globalIndex, level, sequence, capability));
    globalIndex += 1;
  }
}
const levelValidation = validate(records);
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
const csv = [headers.join(","), ...records.map((record) => headers.map((header) => quoteCsv(record[header])).join(","))].join("\n") + "\n";
const jsonl = records.map((record) => JSON.stringify(record)).join("\n") + "\n";
const dataDictionary = `# Prize2Pride 10,000 Situation Dataset\n\nThis package contains **10,000 genuinely distinct original situation-topic records**, not 10,000 human-certified long-form lessons. Every record contains a unique topic title plus explicit listening, reading, writing, and speaking tasks.\n\n## Import files\n\n| File | Use |\n|---|---|\n| \`situations_10000.csv\` | Spreadsheet, database, or bulk-import tooling. UTF-8 and header row included. |\n| \`situations_10000.jsonl\` | Stream-oriented application import. One valid JSON object per line. |\n| \`manifest.json\` | Counts, schema, validation results, and checksum information. |\n\n## Editorial status\n\nAll records carry \`original_curriculum_source_needs_editorial_review\`. They are original curriculum-source material. Before publishing any record as a learner-facing lesson, an editor must approve the Portuguese content, level appropriateness, regional-language choice, Arabic/Tunisian explanation, accessibility, and assessment design.\n\n## Import recommendation\n\nLoad CSV or JSONL into a staging table first. Validate \`lesson_id\` uniqueness, retain \`content_status\`, and create a production lesson only after editorial approval. Do not replace existing lesson content automatically.\n`;
const manifest = {
  dataset: "Prize2Pride Portuguese 10,000 Situation Dataset",
  version: "2026.1",
  generated_at: new Date().toISOString(),
  record_count: records.length,
  level_allocation: Object.fromEntries(levels.map(([level, count]) => [level, count])),
  level_validation: levelValidation,
  unique_lesson_ids: idsSize(records, "lesson_id"),
  unique_topic_titles: idsSize(records, "topic_title"),
  required_four_skills: ["listening_task", "reading_task", "writing_task", "speaking_task"],
  content_status: "original_curriculum_source_needs_editorial_review",
  schema: headers,
};
function idsSize(recordsToCheck, key) { return new Set(recordsToCheck.map((record) => record[key])).size; }
await writeFile(resolve(outputDir, "situations_10000.csv"), csv, "utf8");
await writeFile(resolve(outputDir, "situations_10000.jsonl"), jsonl, "utf8");
await writeFile(resolve(outputDir, "IMPORT_GUIDE.md"), dataDictionary, "utf8");
await writeFile(resolve(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
const checksum = createHash("sha256").update(csv).digest("hex");
await writeFile(resolve(outputDir, "SHA256SUMS.txt"), `${checksum}  situations_10000.csv\n`, "utf8");
console.log(JSON.stringify({ outputDir, recordCount: records.length, uniqueTitles: idsSize(records, "topic_title"), csvSha256: checksum }, null, 2));
