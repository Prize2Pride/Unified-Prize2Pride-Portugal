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
