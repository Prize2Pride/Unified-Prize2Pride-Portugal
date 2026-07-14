# Portuguese A1-C2 Learning Platform

**AI-Powered Portuguese Language Learning from Beginner to Mastery**

A full-stack web application featuring structured lessons (A1–C2 CEFR levels), an AI tutor (رواد الفاضل), interactive exercises, progress tracking, and a Portuguese-themed UI inspired by the Portuguese flag.

---

## 🎯 Platform Overview

### Core Features

| Feature | Description |
|---------|-------------|
| **Structured Lessons** | 10+ real Portuguese lessons (A1–C2) with vocabulary, grammar, reading comprehension, dialogues, and quizzes |
| **AI Professor رواد الفاضل** | Personal AI tutor answering any Portuguese question with 5 teaching registers (Slang, Casual, Informal, Formal, Diplomatic) |
| **Unlimited AI Chat** | Unrestricted conversations with model selector for different learning styles |
| **Course Generator** | AI-powered lesson creation on any topic, level, and exercise type |
| **Conjugation Game** | Interactive practice for 5 key verbs (ser, estar, ter, fazer, ir) with multiple exercise modes |
| **Progress Tracking** | Per-lesson completion, quiz scores, time spent, and level-by-level dashboard |
| **Interactive Lesson Viewer** | Tabbed interface: Vocabulary cards, Reading Comprehension, Grammar rules, Scored quizzes |
| **Tutor Avatar & Welcome** | Personalized tutor photo, native Portuguese welcome audio (1:05), Arabic translation, closable modal |

### Tech Stack

- **Frontend:** React 19 + Tailwind CSS 4 + TypeScript
- **Backend:** Express 4 + tRPC 11 + Node.js
- **Database:** MySQL (Drizzle ORM)
- **AI:** Manus built-in LLM APIs (Claude, Llama, etc.)
- **Auth:** Manus OAuth
- **Storage:** S3 (audio, files)
- **Testing:** Vitest (17 passing tests)

---

## 📁 Project Arborescence

```
portuguese-platform/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/                   # Page-level components
│   │   │   ├── Home.tsx             # Hero, level cards, features, conjugation game
│   │   │   ├── Courses.tsx          # Lesson library with level filter & viewer
│   │   │   ├── Professor.tsx        # AI Professor رواد الفاضل with style selector
│   │   │   ├── Chat.tsx             # Unlimited AI chat with model selector
│   │   │   ├── Progress.tsx         # Progress dashboard with stats
│   │   │   ├── CourseGenerator.tsx  # AI lesson/exercise generator
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Layout.tsx           # Top navigation wrapper
│   │   │   ├── LessonViewer.tsx     # Lesson viewer (vocab, reading, grammar, quiz)
│   │   │   ├── ConjugationGame.tsx  # Verb conjugation practice game
│   │   │   ├── TutorWelcomeModal.tsx # Personalized tutor welcome modal
│   │   │   ├── AIChatBox.tsx        # AI chat interface (streaming ready)
│   │   │   ├── DashboardLayout.tsx  # Dashboard layout (if needed)
│   │   │   └── ui/                  # shadcn/ui components (button, card, etc.)
│   │   ├── contexts/                # React contexts
│   │   │   └── ThemeContext.tsx     # Dark/light theme
│   │   ├── hooks/                   # Custom hooks
│   │   │   └── useAuth.ts           # Authentication hook
│   │   ├── data/                    # Static data
│   │   │   └── lessonsData.ts       # 10+ Portuguese lessons (A1–C2)
│   │   ├── lib/
│   │   │   ├── trpc.ts              # tRPC client setup
│   │   │   └── utils.ts             # Utility functions
│   │   ├── App.tsx                  # Routes & layout
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global theme (green & gold palette)
│   ├── public/                      # Static files
│   │   ├── favicon.ico
│   │   └── robots.txt
│   └── index.html                   # HTML template
│
├── server/                          # Express backend
│   ├── routers/                     # tRPC routers (feature-specific)
│   │   ├── lessons.ts               # Lesson CRUD & progress tracking
│   │   ├── professor.ts             # AI Professor رواد الفاضل chat
│   │   ├── publicChat.ts            # Unlimited AI chat with model selector
│   │   └── courseGenerator.ts       # AI course/exercise generator
│   ├── db.ts                        # Database query helpers
│   ├── routers.ts                   # Main router wiring
│   ├── auth.logout.test.ts          # Auth tests
│   ├── portuguese.test.ts           # Feature tests (17 tests)
│   └── _core/                       # Framework infrastructure
│       ├── index.ts                 # Express server setup
│       ├── context.ts               # tRPC context (auth, user)
│       ├── trpc.ts                  # tRPC instance
│       ├── llm.ts                   # LLM API integration
│       ├── oauth.ts                 # Manus OAuth
│       ├── env.ts                   # Environment variables
│       ├── heartbeat.ts             # Scheduled tasks
│       └── ...other core modules
│
├── drizzle/                         # Database schema & migrations
│   ├── schema.ts                    # Table definitions (users, lessons, userProgress, chatHistory)
│   ├── relations.ts                 # Table relationships
│   ├── migrations/                  # Generated SQL migrations
│   └── meta/                        # Drizzle metadata
│
├── shared/                          # Shared code
│   ├── types.ts                     # TypeScript types
│   ├── const.ts                     # Constants
│   └── _core/                       # Shared utilities
│
├── storage/                         # S3 storage helpers
│   └── index.ts                     # Upload/download functions
│
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── drizzle.config.ts                # Drizzle ORM config
├── vite.config.ts                   # Vite bundler config
├── vitest.config.ts                 # Test runner config
├── .gitignore                       # Git ignore rules
└── todo.md                          # Project checklist
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm (package manager)
- MySQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/Prize2Pride/Portuguese-A1-C2-Platform.git
cd portuguese-platform

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Generate database schema
pnpm drizzle-kit generate

# Run migrations
pnpm drizzle-kit migrate

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

---

## 📊 Database Schema

### Tables

**users** — Core user table (Manus OAuth)
- `id` (PK): Auto-incremented user ID
- `openId` (UNIQUE): Manus OAuth identifier
- `name`, `email`, `loginMethod`: User profile
- `role`: 'user' | 'admin'
- `createdAt`, `updatedAt`, `lastSignedIn`: Timestamps

**lessons** — Portuguese lesson content
- `id` (PK): Lesson ID
- `level`: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
- `title`, `description`: Lesson metadata
- `vocabulary`: JSON array of vocabulary items
- `grammar`: Grammar explanation (Markdown)
- `readingComprehension`: Reading text + questions
- `dialogues`: Conversation examples
- `quizzes`: Quiz questions with answers
- `createdAt`, `updatedAt`: Timestamps

**userProgress** — Track user learning progress
- `id` (PK): Progress record ID
- `userId` (FK): User reference
- `lessonId` (FK): Lesson reference
- `completed`: Boolean (lesson finished?)
- `quizScore`: Quiz score (0–100)
- `timeSpent`: Minutes spent on lesson
- `lastAccessed`: Last access timestamp
- `createdAt`, `updatedAt`: Timestamps

**chatHistory** — Store AI conversations
- `id` (PK): Chat record ID
- `userId` (FK): User reference
- `role`: 'user' | 'assistant'
- `content`: Message text
- `model`: LLM model used
- `style`: Teaching register (professor only)
- `createdAt`: Message timestamp

---

## 🔌 API Routers (tRPC)

### Lessons Router (`/api/trpc/lessons.*`)

```typescript
// Get all lessons with optional level filter
lessons.getAll(level?: string) → Lesson[]

// Get single lesson by ID
lessons.getById(id: string) → Lesson

// Create new lesson (admin only)
lessons.create(data: LessonInput) → Lesson

// Update lesson (admin only)
lessons.update(id: string, data: LessonInput) → Lesson

// Delete lesson (admin only)
lessons.delete(id: string) → { success: boolean }

// Get user progress for a lesson
lessons.getProgress(lessonId: string) → UserProgress

// Update user progress
lessons.updateProgress(lessonId: string, data: ProgressInput) → UserProgress
```

### Professor Router (`/api/trpc/professor.*`)

```typescript
// Chat with Professor رواد الفاضل
professor.chat(message: string, style: Style, conversationHistory?: Message[]) → { content: string }

// Styles: 'slang' | 'casual' | 'informal' | 'formal' | 'diplomatic'
```

### Public Chat Router (`/api/trpc/publicChat.*`)

```typescript
// Unlimited AI chat with model selector
publicChat.chat(message: string, model: string, history?: Message[]) → { content: string }

// List available LLM models
publicChat.listModels() → { id: string; name: string; description: string }[]
```

### Course Generator Router (`/api/trpc/courseGenerator.*`)

```typescript
// Generate full lesson on any topic
courseGenerator.generateLesson(topic: string, level: string) → Lesson

// Generate targeted exercises
courseGenerator.generateExercises(topic: string, type: 'vocabulary' | 'grammar' | 'conversation' | 'writing') → Exercise[]

// Generate cultural knowledge content
courseGenerator.generateCulture(topic: string) → { content: string }
```

---

## 🎨 UI & Theme

### Color Palette (Portuguese Flag Inspired)

- **Primary Green:** `#1B5E20` (deep forest green)
- **Accent Gold:** `#FFA500` (warm gold)
- **Background:** Light gray (`#F5F5F5`)
- **Text:** Dark gray (`#1F2937`)

### Typography

- **Display Font:** Playfair Display (serif, headlines)
- **Body Font:** Inter (sans-serif, body text)

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- All pages fully responsive

---

## 🧪 Testing

### Run Tests

```bash
pnpm test
```

### Test Coverage

- **auth.logout.test.ts** — 1 test (logout functionality)
- **portuguese.test.ts** — 16 tests covering:
  - Professor chat with style registers
  - Public chat with model selector
  - Course generator (lessons, exercises, culture)
  - Lesson CRUD operations
  - Progress tracking

**Total: 17 passing tests**

---

## 📝 Development Workflow

### Adding a New Feature

1. **Update database schema** (`drizzle/schema.ts`)
   ```bash
   pnpm drizzle-kit generate
   ```

2. **Create database helper** (`server/db.ts`)
   - Add query functions for your feature

3. **Create tRPC router** (`server/routers/feature.ts`)
   - Define procedures (public/protected)
   - Use database helpers

4. **Wire router** (`server/routers.ts`)
   - Import and add to main router

5. **Build UI** (`client/src/pages/Feature.tsx`)
   - Use `trpc.feature.useQuery/useMutation` hooks

6. **Write tests** (`server/feature.test.ts`)
   - Cover success/error paths

7. **Commit & push**
   ```bash
   git add .
   git commit -m "feat: add feature description"
   git push
   ```

---

## 🔐 Security & Privacy

- **Authentication:** Manus OAuth (secure, no passwords stored)
- **Database:** All data encrypted at rest
- **API:** All endpoints require authentication (except public routes)
- **Storage:** S3 with secure presigned URLs
- **GDPR:** User data export/deletion available via admin panel

---

## 🌍 Deployment

### Manus Platform

The platform is deployed on Manus with:
- **URL:** `portuguese-ipkfycgb.manus.space`
- **Hosting:** Autoscale (serverless)
- **Database:** Managed MySQL
- **Storage:** S3 integration
- **CI/CD:** Automatic on git push

### Custom Deployment

To deploy elsewhere:

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

Environment variables required:
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Session signing key
- `VITE_APP_ID`: OAuth app ID
- `OAUTH_SERVER_URL`: OAuth provider URL
- `BUILT_IN_FORGE_API_KEY`: LLM API key
- `BUILT_IN_FORGE_API_URL`: LLM API URL

---

## 📚 Lessons Data Structure

Each lesson in `lessonsData.ts` follows this structure:

```typescript
interface LessonData {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  vocabulary: Array<{
    word: string;
    translation: string;
    pronunciation: string;
    example: string;
  }>;
  grammar: string; // Markdown
  readingComprehension: {
    text: string;
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  dialogues: Array<{
    speaker: string;
    text: string;
    translation: string;
  }>;
  quizzes: Array<{
    question: string;
    type: 'multiple-choice' | 'true-false';
    options: string[];
    correctAnswer: number;
  }>;
}
```

---

## 🤝 Contributing

### For Developers Continuing This Project

1. **Clone & install** (see Getting Started)
2. **Read this README** thoroughly
3. **Check `todo.md`** for pending features
4. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Follow the development workflow** (see above)
6. **Push & create a pull request**

### Code Standards

- **TypeScript:** Strict mode enabled
- **Formatting:** Prettier (run `pnpm format`)
- **Linting:** ESLint (via TypeScript)
- **Tests:** All features must have tests
- **Commits:** Clear, descriptive messages

---

## 📞 Support & Contact

For questions or issues:
- Check the `todo.md` for known tasks
- Review existing tests for usage examples
- Refer to component JSDoc comments

---

## 📄 License

MIT License — See LICENSE file for details

---

**Built with ❤️ by Prize2Pride | Powered by Manus AI**

*Last Updated: July 2026*
