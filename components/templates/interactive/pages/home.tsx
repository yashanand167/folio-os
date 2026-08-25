"use client";

import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";

import { designSystem } from "@/components/templates/interactive/design-system";
import { samplePortfolio } from "@/components/templates/interactive/data";
import { CopyEmailButton } from "@/components/templates/minimal/copy-email-button";
import { SoftClickLink } from "@/components/templates/minimal/soft-click-link";
import { ThemeToggle } from "@/components/templates/minimal/theme-toggle";
import { playClickSoft } from "@/lib/click-soft";
import type { Portfolio } from "@/types/portfolio";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const tabs = [
  { id: "introduction", label: "Introduction" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected works" },
  { id: "toolkit", label: "Toolkit" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const panel = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

export default function InteractivePage({
  data = samplePortfolio,
}: {
  data?: Portfolio;
}) {
  const [active, setActive] = useState<TabId>("introduction");

  const socialItems = [
    data.socialLinks.email
      ? { href: `mailto:${data.socialLinks.email}`, label: data.socialLinks.email }
      : null,
    data.socialLinks.github
      ? { href: data.socialLinks.github, label: "GitHub" }
      : null,
    data.socialLinks.linkedin
      ? { href: data.socialLinks.linkedin, label: "LinkedIn" }
      : null,
    data.socialLinks.twitter
      ? { href: data.socialLinks.twitter, label: "Twitter" }
      : null,
    data.socialLinks.website
      ? { href: data.socialLinks.website, label: "Website" }
      : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <div
      className={`${spaceGrotesk.className} min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50`}
      style={{
        fontSize: designSystem.typography.fontSize,
        lineHeight: designSystem.typography.lineHeight,
      }}
    >
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <aside className="flex shrink-0 flex-col justify-between border-zinc-200 px-5 py-6 md:sticky md:top-0 md:h-screen md:w-56 md:border-r md:px-6 md:py-10 dark:border-zinc-800">
          <div>
            <p className="text-sm font-medium">{data.name}</p>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {data.profession}
            </p>
            <nav className="mt-6 flex flex-row gap-1 overflow-x-auto md:mt-10 md:flex-col">
              {tabs.map((tab) => {
                const isActive = tab.id === active;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playClickSoft();
                      setActive(tab.id);
                    }}
                    className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-end gap-2 border-b border-zinc-200 bg-zinc-50/80 px-5 py-3 backdrop-blur md:px-10 dark:border-zinc-800 dark:bg-zinc-950/80">
            <ThemeToggle />
            {data.socialLinks.github ? (
              <SoftClickLink
                href={data.socialLinks.github}
                className="inline-flex size-8 items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="size-4" />
              </SoftClickLink>
            ) : null}
            {data.resumeUrl ? (
              <SoftClickLink
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
              >
                Resume
              </SoftClickLink>
            ) : null}
          </header>

          <main className="min-w-0 flex-1 px-5 py-8 pb-28 md:px-10 md:py-12">

          <AnimatePresence mode="wait">
            {active === "introduction" ? (
              <motion.section
                key="introduction"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Introduction
                </p>
                <div className="mt-6 flex items-center gap-5">
                  {data.profileImage ? (
                    <img
                      src={data.profileImage}
                      alt={data.name}
                      className="aspect-square w-20 rounded-2xl object-cover sm:w-24"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
                      {data.name}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {data.profession}
                    </p>
                  </div>
                </div>
                {data.description ? (
                  <p className="mt-6 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
                    {data.description}
                  </p>
                ) : null}
                {socialItems.length > 0 ? (
                  <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {socialItems.map((link, index) => (
                      <span key={link.href} className="flex items-center">
                        {index > 0 ? (
                          <span
                            aria-hidden
                            className="mr-3 text-zinc-300 dark:text-zinc-700"
                          >
                            /
                          </span>
                        ) : null}
                        <SoftClickLink
                          href={link.href}
                          className="underline underline-offset-4"
                        >
                          {link.label}
                        </SoftClickLink>
                        {link.href.startsWith("mailto:") && data.socialLinks.email ? (
                          <CopyEmailButton email={data.socialLinks.email} />
                        ) : null}
                      </span>
                    ))}
                  </div>
                ) : null}
              </motion.section>
            ) : null}

            {active === "experience" ? (
              <motion.section
                key="experience"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Experience
                </p>
                <ul className="mt-6 flex flex-col gap-5">
                  {data.experiences.map((experience) => (
                    <li key={experience.id}>
                      <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                        <p className="font-medium">
                          {experience.role}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {experience.startDate}
                          {experience.endDate ? ` – ${experience.endDate}` : ""}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-300">
                        {experience.company}
                        {experience.location ? ` · ${experience.location}` : ""}
                      </p>
                      {experience.description ? (
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                          {experience.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {data.education.length > 0 ? (
                  <div className="mt-10">
                    <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                      Education
                    </p>
                    <ul className="mt-4 flex flex-col gap-3">
                      {data.education.map((item) => (
                        <li
                          key={item.id}
                          className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm"
                        >
                          <span>
                            {item.degree}
                            {item.field ? ` ${item.field}` : ""}, {item.institution}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {item.endDate}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </motion.section>
            ) : null}

            {active === "work" ? (
              <motion.section
                key="work"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Selected works
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {data.projects.map((project) => {
                    const href = project.url?.trim();

                    return (
                      <li key={project.id}>
                        <SoftClickLink
                          href={href ?? "#"}
                          className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-transform hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-medium tracking-tight">
                                  {project.title}
                                </h3>
                                {href ? (
                                  <ArrowUpRight className="size-3.5 shrink-0" />
                                ) : null}
                              </div>
                              {project.description ? (
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                  {project.description}
                                </p>
                              ) : null}
                            </div>
                            {project.tags?.[0] ? (
                              <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                {project.tags[0]}
                              </span>
                            ) : null}
                          </div>
                        </SoftClickLink>
                      </li>
                    );
                  })}
                </ul>
              </motion.section>
            ) : null}

            {active === "toolkit" ? (
              <motion.section
                key="toolkit"
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                  Toolkit
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
