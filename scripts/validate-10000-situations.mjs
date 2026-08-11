import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve(process.cwd(), "exports", "prize2pride-10000-situations-v1");
const jsonlPath = resolve(outputDir, "situations_10000.jsonl");
const lines = (await readFile(jsonlPath, "utf8")).trim().split("\n");
const records = lines.map((line, index) => {
  try { return JSON.parse(line); } catch { throw new Error(`Invalid JSON on line ${index + 1}`); }
});
const expected = { A1: 1400, A2: 1600, B1: 1800, B2: 1800, C1: 1700, C2: 1700 };
const counts = Object.fromEntries(Object.keys(expected).map((level) => [level, records.filter((record) => record.cefr_level === level).length]));
const uniqueIds = new Set(records.map((record) => record.lesson_id)).size;
const uniqueTitles = new Set(records.map((record) => record.topic_title)).size;
const requiredSkills = ["listening_task", "reading_task", "writing_task", "speaking_task"];
const incomplete = records.filter((record) => requiredSkills.some((key) => typeof record[key] !== "string" || !record[key].trim()));
const wrongStatus = records.filter((record) => record.content_status !== "original_curriculum_source_needs_editorial_review");
const valid = records.length === 10000 && uniqueIds === 10000 && uniqueTitles === 10000 && incomplete.length === 0 && wrongStatus.length === 0 && Object.entries(expected).every(([level, count]) => counts[level] === count);
const report = { valid, record_count: records.length, unique_lesson_ids: uniqueIds, unique_topic_titles: uniqueTitles, level_allocation: counts, incomplete_four_skill_records: incomplete.length, unexpected_content_status_records: wrongStatus.length, jsonl_sha256: createHash("sha256").update(await readFile(jsonlPath)).digest("hex") };
await writeFile(resolve(outputDir, "VALIDATION_REPORT.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
if (!valid) throw new Error(JSON.stringify(report));
console.log(JSON.stringify(report, null, 2));
