# Portuguese for Arabic Speakers — Source Requirements Record

This document preserves the product requirements drawn from the authorized `Portuguese-for-Arabic-Speakers` repository. It contains **no copied credentials, private environment configuration, runtime data, or source code**.

## Incorporated Product Requirements

The unified Prize2Pride platform supports Arabic-speaking learners through Arabic explanation mode, Tunisian Arabic explanation mode, Portuguese immersion mode, and right-to-left-compatible explanation surfaces. The product direction also calls for practical situation-based learning, interactive exercises, browser-assisted listening and speaking rehearsal, adaptive tutor guidance, game-like progress, and culturally respectful Portuguese learning for Tunisia-first audiences.

## Unified Implementation Location

| Requirement area | Unified Prize2Pride location |
|---|---|
| Tutor choice and explanation languages | `shared/learningWorld.ts`, `client/src/pages/Professor.tsx` |
| Situation-based learning | `shared/learningWorld.ts`, `client/src/pages/Situations.tsx` |
| Short-form active practice | `client/src/pages/ForYou.tsx` |
| A1–C2 four-skill curriculum model | `shared/tenThousandCurriculum.ts`, `client/src/pages/Curriculum.tsx` |
| Learner preferences and practice persistence | `drizzle/schema.ts`, `server/routers/companion.ts` |

## Handling Boundary

This is a product-requirements record, not a verbatim mirror of the source repository. Any future import must follow `docs/REPOSITORY_INTAKE.md`, including source review, attribution, license review, and credential exclusion.
