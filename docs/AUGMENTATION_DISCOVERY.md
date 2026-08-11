# Prize2Pride Tunisia-First Augmentation Discovery

## Verified Baseline

The implementation to preserve is on the repository’s `main` branch, not its sparse default `master` branch. The current main branch includes the full React, Express, tRPC, Drizzle, Manus OAuth, lesson viewer, quiz, progress, chat, tutor welcome, and course-generation surfaces.

Professor Roued El Fadhel already has a tutor welcome component with a stored portrait, a native Portuguese welcome recording, and an Arabic introduction. The course generator already calls the server-side model helper with a 16,000-token output limit for lesson and cultural-content generation. The live model catalog confirms that `claude-opus-4-7` remains available. A remaining server prompt still calls the principal tutor “Professor Carlos”; that is an implementation consistency defect to correct while retaining the established Roued experience.

Chandra is not represented in the tracked code on the inspected `main` branch. She must therefore be added as a distinct, professionally presented adult tutor profile rather than being assumed to be an existing asset.

## Tunisia-First Product Implications

The product should be mobile-first, latency-aware, and useful without assuming high-end connectivity. DataReportal reports 10.5 million internet users and 15.7 million active mobile connections in Tunisia at the start of 2025, while indicating a 26.56 Mbps median mobile download speed; a compact, resilient client and carefully bounded generation calls are therefore appropriate design defaults.[1]

The companion must not pretend that generic language-model output is reliably fluent in Tunisian Arabic. TounsiBench evaluated ten widely used LLMs claiming Arabic support and found that most struggled to recognise and respond appropriately in the dialect.[2] Tunisian-dialect input must therefore use explicit language labeling, confidence-aware fallback to Arabic/English clarification, representative human evaluation, and a learner-visible correction route.

## Guardrails for the Long-Form Generator

The existing long-form generator is a useful foundation, but a high token ceiling does not by itself ensure quality or guarantee a specific line count. The augmentation will favour structured lesson sections, maximum-output controls, grounded situation metadata, revision provenance, validation of required fields, moderation, rate limiting, and review queues over unconstrained bulk generation. Generated lessons should be treated as drafts until they meet content-quality checks.

## References

[1]: https://datareportal.com/reports/digital-2025-tunisia "Digital 2025: Tunisia"
[2]: https://aclanthology.org/2025.emnlp-main.1756/ "TounsiBench: Benchmarking Large Language Models for Tunisian Arabic"
