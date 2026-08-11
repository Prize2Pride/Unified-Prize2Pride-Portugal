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
