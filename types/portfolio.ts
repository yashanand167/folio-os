import { z } from "zod";

export const portfolioTypes = [
  "minimal",
  "interactive",
  "design-focused",
] as const;

export const portfolioTypeSchema = z.enum(portfolioTypes);

export type PortfolioType = z.infer<typeof portfolioTypeSchema>;

export const socialLinkPatterns = {
  github:
    /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?\/?$/i,
  linkedin:
    /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/i,
  twitter:
    /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]{1,15}\/?$/i,
  website:
    /^https?:\/\/(www\.)?[a-zA-Z0-9][-a-zA-Z0-9.]*\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/i,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function wordsBetween(min: number, max: number, label: string) {
  return z
    .string()
    .trim()
    .refine(
      (value) => {
        const count = wordCount(value);
        return count >= min && count <= max;
      },
      { message: `${label} must be between ${min} and ${max} words` },
    );
}

const optionalHttpUrl = z.httpUrl().optional();

export const experienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1).optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1).optional(),
  description: wordsBetween(5, 40, "Experience description").optional(),
});

export const educationSchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().min(1).optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1).optional(),
  description: wordsBetween(5, 40, "Education description").optional(),
});

export const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1).optional(),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: wordsBetween(5, 40, "Project description").optional(),
  url: optionalHttpUrl,
  image: optionalHttpUrl,
  tags: z.array(z.string().min(1)).optional(),
});

export const socialLinksSchema = z.object({
  github: z
    .string()
    .regex(socialLinkPatterns.github, "Enter a valid GitHub profile URL")
    .optional(),
  linkedin: z
    .string()
    .regex(socialLinkPatterns.linkedin, "Enter a valid LinkedIn profile URL")
    .optional(),
  twitter: z
    .string()
    .regex(socialLinkPatterns.twitter, "Enter a valid X / Twitter profile URL")
    .optional(),
  website: z
    .string()
    .regex(socialLinkPatterns.website, "Enter a valid website URL")
    .optional(),
  email: z
    .string()
    .regex(socialLinkPatterns.email, "Enter a valid email address")
    .optional(),
});

export const portfolioSchema = z.object({
  id: z.string().min(1),
  portfolioType: portfolioTypeSchema,
  name: z.string().min(1),
  profession: z.string().min(1),
  description: wordsBetween(10, 40, "Description").optional(),
  profileImage: optionalHttpUrl,
  resumeUrl: optionalHttpUrl,
  socialLinks: socialLinksSchema,
  experiences: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
});

export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
