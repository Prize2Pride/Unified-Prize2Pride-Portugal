CREATE TABLE `chatHistory` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `userMessage` text NOT NULL,
  `assistantMessage` text NOT NULL,
  `style` varchar(50) NOT NULL DEFAULT 'formal',
  `topic` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `chatHistory_id` PRIMARY KEY(`id`)
);

CREATE TABLE `lessons` (
  `id` int AUTO_INCREMENT NOT NULL,
  `title` varchar(255) NOT NULL,
  `titlePt` varchar(255) NOT NULL,
  `description` text,
  `level` enum('A1','A2','B1','B2','C1','C2') NOT NULL DEFAULT 'A1',
  `topic` varchar(255),
  `order` int NOT NULL,
  `vocabulary` json NOT NULL,
  `grammar` text,
  `readingComprehension` text,
  `readingComprehensionTranslation` text,
  `dialogues` json,
  `quizQuestions` json NOT NULL,
  `isPublished` boolean DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);

CREATE TABLE `userProgress` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `lessonId` int NOT NULL,
  `isCompleted` boolean DEFAULT false,
  `quizScore` int,
  `timeSpent` int,
  `startedAt` timestamp NOT NULL DEFAULT (now()),
  `completedAt` timestamp,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);

CREATE TABLE `learnerPreferences` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `tutor` enum('roued','chandra') NOT NULL DEFAULT 'roued',
  `explanationLanguage` enum('ar','tounsi','pt','en') NOT NULL DEFAULT 'ar',
  `immersionMode` enum('guided','balanced','immersive') NOT NULL DEFAULT 'balanced',
  `dailyGoalMinutes` int NOT NULL DEFAULT 15,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `learnerPreferences_id` PRIMARY KEY(`id`),
  CONSTRAINT `learnerPreferences_userId_unique` UNIQUE(`userId`)
);

CREATE TABLE `situationPractice` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `situationId` varchar(32) NOT NULL,
  `masteryScore` int NOT NULL DEFAULT 0,
  `attempts` int NOT NULL DEFAULT 0,
  `lastPracticedAt` timestamp,
  `nextReviewAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `situationPractice_id` PRIMARY KEY(`id`),
  CONSTRAINT `situation_practice_user_situation_unique` UNIQUE(`userId`,`situationId`)
);

CREATE TABLE `microMomentProgress` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `momentId` varchar(64) NOT NULL,
  `isSaved` boolean NOT NULL DEFAULT false,
  `isCompleted` boolean NOT NULL DEFAULT false,
  `correctAttempts` int NOT NULL DEFAULT 0,
  `lastSeenAt` timestamp NOT NULL DEFAULT (now()),
  `completedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `microMomentProgress_id` PRIMARY KEY(`id`),
  CONSTRAINT `micro_moment_progress_user_moment_unique` UNIQUE(`userId`,`momentId`)
);
