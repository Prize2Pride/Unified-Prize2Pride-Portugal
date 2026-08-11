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
--> statement-breakpoint
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
