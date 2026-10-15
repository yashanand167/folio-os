import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import db from "@/db";
import {
  education,
  experience,
  portfolio,
  project,
  skill,
} from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import { isCloudinaryConfigured, uploadImageFile } from "@/lib/cloudinary";
import { createPortfolioSchema } from "@/types/portfolio";

function newId() {
  return crypto.randomUUID();
}

function firstIssueMessage(error: {
  issues: { message: string }[];
}) {
  return error.issues[0]?.message ?? "Invalid portfolio data";
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Sign in to save your portfolio." }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  let raw: unknown;
  let profileImageFile: File | null = null;

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const data = form.get("data");
    if (typeof data !== "string") {
      return NextResponse.json(
        { error: "Missing portfolio data." },
        { status: 400 },
      );
    }
    try {
      raw = JSON.parse(data);
    } catch {
      return NextResponse.json(
        { error: "Portfolio data must be valid JSON." },
        { status: 400 },
      );
    }
    const file = form.get("profileImage");
    profileImageFile = file instanceof File && file.size > 0 ? file : null;
  } else {
    raw = await request.json();
  }

  const parsed = createPortfolioSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: firstIssueMessage(parsed.error), issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const input = parsed.data;
  let profileImage = input.profileImage;

  if (profileImageFile) {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        },
        { status: 500 },
      );
    }

    try {
      profileImage = await uploadImageFile(
        profileImageFile,
        `folio-os/${session.user.id}`,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  const existing = await db.query.portfolio.findFirst({
    where: and(
      eq(portfolio.userId, session.user.id),
      eq(portfolio.portfolioType, input.portfolioType),
    ),
  });

  const portfolioId = existing?.id ?? newId();

  const portfolioRow = {
    id: portfolioId,
    userId: session.user.id,
    portfolioType: input.portfolioType,
    name: input.name,
    profession: input.profession,
    description: input.description,
    profileImage,
    resumeUrl: input.resumeUrl,
    username: input.username,
    github: input.socialLinks.github,
    linkedin: input.socialLinks.linkedin,
    twitter: input.socialLinks.twitter,
    website: input.socialLinks.website,
    email: input.socialLinks.email,
  };

  if (existing) {
    await db
      .delete(experience)
      .where(eq(experience.portfolioId, portfolioId));
    await db.delete(education).where(eq(education.portfolioId, portfolioId));
    await db.delete(skill).where(eq(skill.portfolioId, portfolioId));
    await db.delete(project).where(eq(project.portfolioId, portfolioId));
    await db
      .update(portfolio)
      .set(portfolioRow)
      .where(eq(portfolio.id, portfolioId));
  } else {
    await db.insert(portfolio).values(portfolioRow);
  }

  if (input.experiences.length > 0) {
    await db.insert(experience).values(
      input.experiences.map((item) => ({
        id: newId(),
        portfolioId,
        company: item.company,
        role: item.role,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
      })),
    );
  }

  if (input.education.length > 0) {
    await db.insert(education).values(
      input.education.map((item) => ({
        id: newId(),
        portfolioId,
        institution: item.institution,
        degree: item.degree,
        field: item.field,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
      })),
    );
  }

  if (input.skills.length > 0) {
    await db.insert(skill).values(
      input.skills.map((item) => ({
        id: newId(),
        portfolioId,
        name: item.name,
        category: item.category,
      })),
    );
  }

  if (input.projects.length > 0) {
    await db.insert(project).values(
      input.projects.map((item) => ({
        id: newId(),
        portfolioId,
        title: item.title,
        description: item.description,
        url: item.url,
        image: item.image,
        tags: item.tags,
      })),
    );
  }

  return NextResponse.json({ id: portfolioId });
}
