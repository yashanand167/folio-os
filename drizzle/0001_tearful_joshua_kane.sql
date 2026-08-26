CREATE TYPE "public"."portfolio_type" AS ENUM('minimal', 'interactive', 'design-focused');--> statement-breakpoint
CREATE TABLE "education" (
	"id" text PRIMARY KEY NOT NULL,
	"portfolio_id" text NOT NULL,
	"institution" text NOT NULL,
	"degree" text NOT NULL,
	"field" text,
	"start_date" text NOT NULL,
	"end_date" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" text PRIMARY KEY NOT NULL,
	"portfolio_id" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"location" text,
	"start_date" text NOT NULL,
	"end_date" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "portfolio" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"portfolio_type" "portfolio_type" NOT NULL,
	"name" text NOT NULL,
	"profession" text NOT NULL,
	"description" text,
	"profile_image" text,
	"resume_url" text,
	"github" text,
	"linkedin" text,
	"twitter" text,
	"website" text,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"portfolio_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"url" text,
	"image" text,
	"tags" text[]
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" text PRIMARY KEY NOT NULL,
	"portfolio_id" text NOT NULL,
	"name" text NOT NULL,
	"category" text
);
--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "education_portfolioId_idx" ON "education" USING btree ("portfolio_id");--> statement-breakpoint
CREATE INDEX "experience_portfolioId_idx" ON "experience" USING btree ("portfolio_id");--> statement-breakpoint
CREATE INDEX "portfolio_userId_idx" ON "portfolio" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "portfolio_userId_type_uidx" ON "portfolio" USING btree ("user_id","portfolio_type");--> statement-breakpoint
CREATE INDEX "project_portfolioId_idx" ON "project" USING btree ("portfolio_id");--> statement-breakpoint
CREATE INDEX "skill_portfolioId_idx" ON "skill" USING btree ("portfolio_id");