ALTER TABLE "portfolio" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_username_unique" UNIQUE("username");