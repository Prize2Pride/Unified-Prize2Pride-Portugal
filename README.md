# Unified Prize2Pride Portugal

**Unified Prize2Pride Portugal** is a Portuguese mastery SaaS for Tunisian and global learners. It brings the existing A1–C2 learning platform together with the Portuguese-for-Arabic-Speakers product requirements in one public, preservation-first codebase.

> The platform is designed as a learning companion: it combines structured lessons, practical situations, human-reviewable generation, and multilingual guidance rather than treating fluent AI output as an automatic guarantee of educational quality.

## What Is Unified Here

| Foundation | Preserved contribution |
|---|---|
| `Portuguese-A1-C2-Platform` `main` branch | React + Express + tRPC + Drizzle platform, Manus OAuth, lesson viewer, quizzes, progress, Portuguese tutor experience, course generator, tests, and migrations. |
| `Portuguese-for-Arabic-Speakers` | Product requirements for Arabic and Tunisian-dialect support, bilingual explanations, interactive practice, games, and culturally grounded learner support. The source brief is preserved at `docs/source-repositories/PORTUGUESE_FOR_ARABIC_SPEAKERS.md`. |

## Prize2Pride Learning Companion

Professor Roued El Fadhel is the principal Portuguese tutor. Chandra is a distinct conversation-and-confidence tutor profile, presented respectfully as an adult professional. Learners can select a tutor, choose Arabic, Tunisian Arabic, Portuguese, or English explanations, select a real-life practice context, and learn through Portuguese-first examples.

The platform generates **8,064 deterministic practice situations** across A1–C2, including arrival, housing, work, university, health, family, shopping, travel, public services, digital life, culture, entrepreneurship, emergency problem solving, sustainability, hospitality, and community participation. Each situation is a structured starting point for guided conversation, lessons, and review—not a claim that all content has already undergone human curriculum approval.

## Ten-Thousand-Lesson Curriculum

The `/curriculum` map now exposes **10,000 original A1–C2 lesson templates** across personal, civic, academic, and professional domains. The distribution is 1,400 A1 lessons, 1,600 A2 lessons, 1,800 B1 lessons, 1,800 B2 lessons, 1,700 C1 lessons, and 1,700 C2 lessons. Each template contains explicit learner actions for **listening, reading, writing, and speaking**, a practical situation, a level-based objective, and a clear editorial status.

The templates are not a claim that 10,000 fully authored lessons have been editorially certified. The catalog is a scalable original curriculum structure, and every learner-facing dialogue, explanation, task, regional language choice, or assessment needs review before publication. The evidence and originality boundary are documented in `docs/CURRICULUM_EVIDENCE_BOUNDARY.md`.

## Creator-Led Learning Feed

The `/for-you` experience turns the existing structured lessons into short, active learning moments. Each moment makes its source lesson visible, lets the learner hear a Portuguese target in the browser, requires an answer rather than passive viewing, supplies immediate feedback, and offers a deliberate next action. The path progresses from **Beginner** to **Hero** without autoplay, public popularity metrics, or unmoderated creator uploads.

Authenticated learners can persist saved and completed moments through the included `microMomentProgress` migration. Visitors can still practise locally without an account.

## Generative Content Safety

The course generator supports long-form lesson drafts, targeted exercises, and cultural knowledge. The generator now asks for situation grounding and explicit tutor-review notes. A high output limit does not itself certify a lesson; generated output should be validated, reviewed, and published through an editorial workflow before it becomes learner-facing curriculum.

Tunisian Arabic support is deliberately confidence-aware. Models can be unreliable with the dialect, so the companion must label uncertainty, offer Arabic or Portuguese clarification, and route disputed phrasing into review.[1]

## Local Development

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

Apply the included Drizzle migrations against the intended database before enabling learner preferences or situation-practice persistence in an environment.

## Current Validation

The unified baseline currently passes **25 automated tests**, TypeScript checking, a production build, and local visual interaction checks. Page-level lazy loading keeps the short-form feed and curriculum studio in separate bundles; explicit mobile performance budgets remain a pre-launch task.

## Repository Boundaries

This repository is the sole destination for future unified development. Additional repositories are incorporated only when the owner explicitly selects or grants access to them. Their original histories and requirements should be documented before any code or content is migrated.

## References

[1]: https://aclanthology.org/2025.emnlp-main.1756/ "TounsiBench: Benchmarking Large Language Models for Tunisian Arabic"
