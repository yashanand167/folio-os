import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { portfolioTypes } from "@/types/portfolio";

export const portfolioTypeEnum = pgEnum("portfolio_type", portfolioTypes);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    issuer: text("issuer").notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("account_issuer_accountId_uidx").on(
      table.issuer,
      table.accountId,
    ),
    index("account_userId_idx").on(table.userId),
  ],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const portfolio = pgTable(
  "portfolio",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    portfolioType: portfolioTypeEnum("portfolio_type").notNull(),
    name: text("name").notNull(),
    profession: text("profession").notNull(),
    description: text("description"),
    profileImage: text("profile_image"),
    resumeUrl: text("resume_url"),
    github: text("github"),
    linkedin: text("linkedin"),
    twitter: text("twitter"),
    website: text("website"),
    email: text("email"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("portfolio_userId_idx").on(table.userId),
    uniqueIndex("portfolio_userId_type_uidx").on(
      table.userId,
      table.portfolioType,
    ),
  ],
);

export const experience = pgTable(
  "experience",
  {
    id: text("id").primaryKey(),
    portfolioId: text("portfolio_id")
      .notNull()
      .references(() => portfolio.id, { onDelete: "cascade" }),
    company: text("company").notNull(),
    role: text("role").notNull(),
    location: text("location"),
    startDate: text("start_date").notNull(),
    endDate: text("end_date"),
    description: text("description"),
  },
  (table) => [index("experience_portfolioId_idx").on(table.portfolioId)],
);

export const education = pgTable(
  "education",
  {
    id: text("id").primaryKey(),
    portfolioId: text("portfolio_id")
      .notNull()
      .references(() => portfolio.id, { onDelete: "cascade" }),
    institution: text("institution").notNull(),
    degree: text("degree").notNull(),
    field: text("field"),
    startDate: text("start_date").notNull(),
    endDate: text("end_date"),
    description: text("description"),
  },
  (table) => [index("education_portfolioId_idx").on(table.portfolioId)],
);

export const skill = pgTable(
  "skill",
  {
    id: text("id").primaryKey(),
    portfolioId: text("portfolio_id")
      .notNull()
      .references(() => portfolio.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category"),
  },
  (table) => [index("skill_portfolioId_idx").on(table.portfolioId)],
);

export const project = pgTable(
  "project",
  {
    id: text("id").primaryKey(),
    portfolioId: text("portfolio_id")
      .notNull()
      .references(() => portfolio.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    url: text("url"),
    image: text("image"),
    tags: text("tags").array(),
  },
  (table) => [index("project_portfolioId_idx").on(table.portfolioId)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  portfolios: many(portfolio),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const portfolioRelations = relations(portfolio, ({ one, many }) => ({
  user: one(user, {
    fields: [portfolio.userId],
    references: [user.id],
  }),
  experiences: many(experience),
  education: many(education),
  skills: many(skill),
  projects: many(project),
}));

export const experienceRelations = relations(experience, ({ one }) => ({
  portfolio: one(portfolio, {
    fields: [experience.portfolioId],
    references: [portfolio.id],
  }),
}));

export const educationRelations = relations(education, ({ one }) => ({
  portfolio: one(portfolio, {
    fields: [education.portfolioId],
    references: [portfolio.id],
  }),
}));

export const skillRelations = relations(skill, ({ one }) => ({
  portfolio: one(portfolio, {
    fields: [skill.portfolioId],
    references: [portfolio.id],
  }),
}));

export const projectRelations = relations(project, ({ one }) => ({
  portfolio: one(portfolio, {
    fields: [project.portfolioId],
    references: [portfolio.id],
  }),
}));

