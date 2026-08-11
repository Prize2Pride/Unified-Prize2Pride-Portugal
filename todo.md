# Portuguese A1-C2 Platform TODO

## Database & Backend
- [x] Update drizzle/schema.ts with lessons, userProgress, chatHistory tables
- [x] Run migration and apply SQL via webdev_execute_sql
- [x] Build server/routers/lessons.ts (CRUD + progress)
- [x] Build server/routers/professor.ts (AI Professor Carlos)
- [x] Build server/routers/publicChat.ts (unlimited chat with model selector)
- [x] Build server/routers/courseGenerator.ts (AI lesson/exercise generator)
- [x] Wire all routers in server/routers.ts

## Frontend - Global
- [x] Set Portuguese flag-inspired green/gold theme in index.css
- [x] Add Google Fonts (Playfair Display + Inter) in client/index.html
- [x] Build Layout.tsx with top nav (Home, Courses, Professor, Chat, Progress)
- [x] Update App.tsx with all routes

## Frontend - Pages
- [x] Home page: hero, level cards, feature highlights, conjugation game section, CTA
- [x] Courses page: level filter, lesson grid, lesson viewer
- [x] Professor page: AI Professor Carlos chat with style selector (Slang, Casual, Informal, Formal, Diplomatic)
- [x] Chat page: unlimited AI chat with model selector (publicChat pattern from Italian repo)
- [x] Progress page: dashboard with level stats, quiz scores, time spent
- [x] Course Generator page: Lesson / Exercises / Culture tabs at /generate

## Frontend - Components
- [x] LessonViewer.tsx: Vocabulary, Reading, Grammar, Quiz tabs with score tracking
- [x] ConjugationGame.tsx: ser, estar, ter, fazer, ir — fill-blank + multiple-choice modes
- [x] AIChatBox.tsx: streaming-ready with Markdown rendering
- [x] Layout.tsx: top nav with active state, user avatar, responsive

## Data
- [x] 10 real Portuguese lessons (A1-C2) with vocabulary, grammar, reading comprehension, dialogues, quizzes
  - A1: Greetings & Introductions, Numbers & Counting
  - A2: Family & Relationships, Shopping & Prices
  - B1: Portuguese Verb Tenses, Expressing Opinions & Debating
  - B2: Fado Music & Saudade, Portuguese Cinema & Culture
  - C1: The Subjunctive Mood
  - C2: Fernando Pessoa & Portuguese Literature

## Tests
- [x] Vitest: auth.logout.test.ts (1 test)
- [x] Vitest: portuguese.test.ts (16 tests — auth, professor, publicChat, courseGenerator, lessons)
- [x] All 17 tests passing

## Personalization (Phase 2)
- [x] Upload user photo to webdev storage
- [x] Generate Portuguese welcome audio (native male voice, 10 sentences)
- [x] Create Arabic translation of welcome message
- [x] Build TutorWelcomeModal component with photo, audio player, Arabic text, close button
- [x] Integrate TutorWelcomeModal into Chat page (auto-plays on first visit, localStorage tracking)
- [x] Replace all "Professor Carlos" references with "رواد الفاضل" throughout platform
- [x] Update Home page tutor feature card and CTA section
- [x] Update Professor page header and welcome message
- [x] Update Chat page welcome modal
- [x] Verify all pages render correctly with new tutor name

## Delivery
- [x] Final checkpoint and deliver to user
- [x] Personalized checkpoint with رواد الفاضل avatar and welcome modal

## Prize2Pride Tunisia-First Augmentation
- [x] Preserve all baseline routes, lessons, tutor welcome assets, and generation endpoints while augmenting the platform on this feature branch.
- [x] Correct the remaining backend tutor identity so Professor Roued El Fadhel is represented consistently across all learner-facing flows.
- [x] Add a respectfully presented Chandra tutor profile and explicit tutor-selection model without altering the established Professor Roued experience.
- [x] Add Arabic, Tunisian-dialect, Portuguese, and right-to-left learner preferences with clear Portuguese-immersion and Arabic-explanation modes.
- [x] Add a situation-driven curriculum domain model supporting thousands of validated Portuguese real-life contexts.
- [x] Add a searchable situation explorer and hand selected contexts into the multilingual tutor practice flow.
- [ ] Upgrade the existing long-form lesson generator to structured, grounded, learner-safe outputs with tenant-aware rate limits and human-review controls.
- [x] Add adaptive learner companion recommendations, durable mastery signals, review queues, and privacy-aware progress analytics.
- [ ] Add production-quality test coverage, accessibility checks, performance budgets, and staged scale-readiness documentation. Initial type, test, build, local visual checks, and route-level code splitting have passed; database migration and explicit performance budgets remain outstanding.

## Unified Prize2Pride Repository
- [x] Audit the implemented `main` branch and the Arabic-speakers repository as the only currently authorized source inputs.
- [ ] Create a public Unified Prize2Pride repository that preserves the existing main-branch platform history and documents imported Arabic-speakers requirements.
- [x] Define a repository intake process for additional repositories that the owner explicitly selects or grants through the connected integration.
- [x] Add a public product showcase documenting the unified Portuguese companion, tutors, curriculum generation, and Tunisia-first learning model.
- [x] Create the public Unified Prize2Pride repository and import this implemented feature branch as its preserved baseline.
- [x] Preserve the Arabic-speakers repository requirements as a documented source module in the unified codebase.

## Creator-Led Beginner-to-Hero Experience
- [x] Define the Arabic- and Tunisian-speaker short-form learning journey from Beginner to Hero using the existing lesson catalog.
- [x] Transform existing lesson material into structured short-form learning moments with vocabulary, listening, response, and progress hooks.
- [x] Build a vertical creator-style learning feed with instant practice and respectful tutor prompts.
- [x] Add a learner hero path, daily missions, saved learning moments, and non-competitive progress loops.
- [ ] Define creator moderation, publishing, attribution, and safety boundaries before allowing user-generated educational content.
- [ ] Validate the new feed experience, performance, accessibility, and learning-state persistence before publishing the next release. Visual active-response validation has passed; authenticated persistence requires database migration in the target environment.
