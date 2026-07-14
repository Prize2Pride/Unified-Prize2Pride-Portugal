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
--> statement-breakpoint
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
--> statement-breakpoint
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
