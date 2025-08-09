ALTER TABLE `posts` ADD `updated_at` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `deleted_at` text;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` text;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `deleted_at` text;