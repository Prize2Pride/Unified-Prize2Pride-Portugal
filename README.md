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

The platform generates **13,440 deterministic practice situations** across A1–C2, including arrival, housing, work, university, health, family, shopping, travel, public services, digital life, culture, entrepreneurship, emergency problem solving, sustainability, hospitality, and community participation. Each situation is a structured starting point for guided conversation, lessons, and review—not a claim that all content has already undergone human curriculum approval.

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

The unified baseline currently passes **21 automated tests**, TypeScript checking, and a production build. The production build produces a large initial client bundle, so route-level code splitting is an explicit next performance task before a broad public launch.

## Repository Boundaries

This repository is the sole destination for future unified development. Additional repositories are incorporated only when the owner explicitly selects or grants access to them. Their original histories and requirements should be documented before any code or content is migrated.

## References

[1]: https://aclanthology.org/2025.emnlp-main.1756/ "TounsiBench: Benchmarking Large Language Models for Tunisian Arabic"
