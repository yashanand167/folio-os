"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { designSystem } from "@/components/templates/minimal/design-system";
import { samplePortfolio } from "@/components/templates/minimal/data";
import { CopyEmailButton } from "@/components/templates/minimal/copy-email-button";
import { SoftClickLink } from "@/components/templates/minimal/soft-click-link";
import { ThemeToggle } from "@/components/templates/minimal/theme-toggle";
import { cn } from "@/lib/utils";
import type { Portfolio } from "@/types/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

const dropIn = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const listStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const taglineWords = [
  "code",
  "crafting",
  "pixels",
  "one",
  "at",
  "a",
  "time",
];

function CraftingTagline() {
  return (
    <motion.p
      className="mt-5 flex items-center justify-center text-xs tracking-wide text-neutral-500 sm:text-sm dark:text-neutral-400"
      initial="closed"
      animate="open"
    >
      <span
        aria-hidden
        className="font-mono text-neutral-400 dark:text-neutral-500"
      >
        {"<"}
      </span>
      <motion.span
        className="inline-flex overflow-hidden whitespace-nowrap"
        variants={{
          closed: { width: 0, marginLeft: 0, marginRight: 0 },
          open: {
            width: "auto",
            marginLeft: 6,
            marginRight: 6,
            transition: {
              delay: 0.45,
              width: { duration: 0.7, ease, delay: 0.45 },
              marginLeft: { duration: 0.7, ease, delay: 0.45 },
              marginRight: { duration: 0.7, ease, delay: 0.45 },
              staggerChildren: 0.08,
              delayChildren: 0.62,
            },
          },
        }}
      >
        {taglineWords.map((word) => (
          <motion.span
            key={word}
            className="inline-block px-[0.2em]"
            variants={{
              closed: { opacity: 0, y: 10, scale: 0.45 },
              open: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 420, damping: 22 },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
      <span
        aria-hidden
        className="font-mono text-neutral-400 dark:text-neutral-500"
      >
        {"/>"}
      </span>
    </motion.p>
  );
}

function DottedRule({
  fullWidth = false,
  flush = false,
  className,
}: {
  fullWidth?: boolean;
  flush?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        fullWidth
          ? "relative ml-[calc(50%-50vw)] w-screen max-w-[100vw]"
          : !flush && "px-4 sm:px-6",
        className,
      )}
      aria-hidden
      variants={dropIn}
    >
      <div className="h-px w-full bg-[repeating-linear-gradient(to_right,#d4d4d4_0_10px,transparent_10px_16px)] dark:bg-[repeating-linear-gradient(to_right,#525252_0_10px,transparent_10px_16px)]" />
    </motion.div>
  );
}

export default function MinimalPage({
  data = samplePortfolio,
}: {
  data?: Portfolio;
}) {
  const { typography } = designSystem;

  return (
    <div
      className="bg-page-wash min-h-screen overflow-x-hidden text-[15px] text-neutral-950 sm:text-base dark:text-neutral-50"
      style={{
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeight,
        lineHeight: typography.lineHeight,
      }}
    >
      <motion.div
        className="border-line-dash-x mx-3 min-h-screen w-auto max-w-none bg-white sm:mx-8 sm:max-w-2xl md:mx-auto md:max-w-3xl dark:bg-neutral-950"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.header
          className="border-line-dash-b flex items-center justify-between gap-3 px-4 pt-8 pb-3 sm:gap-4 sm:px-6 sm:pt-16 sm:pb-4"
          variants={dropIn}
        >
          <p className="truncate text-xs tracking-tight sm:text-sm">{data.name}</p> 
          <nav className="flex shrink-0 items-center gap-2.5 text-xs text-neutral-500 sm:gap-4 sm:text-sm dark:text-neutral-400">
            <div className="flex items-center gap-2.5 sm:gap-4">
              <SoftClickLink href="#work">Work</SoftClickLink>
              <SoftClickLink href="#about">About</SoftClickLink>
              {data.resumeUrl ? (
                <SoftClickLink href={data.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </SoftClickLink>
              ) : null}
            </div>
            <span aria-hidden className="border-line-dash-l h-4" />
            <ThemeToggle />
          </nav>
          <span
            aria-hidden
            className="line-cross bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
          />
          <span
            aria-hidden
            className="line-cross right-0 bottom-0 translate-x-1/2 translate-y-1/2"
          />
        </motion.header>

        <motion.section className="px-4 py-3 sm:px-6 sm:py-4" variants={dropIn}>
          <CraftingTagline />
        </motion.section>

        <motion.section variants={dropIn} className="mt-5">
          <DottedRule fullWidth />
          <div className="flex flex-row items-center">
            {data.profileImage ? (
              <div className="flex shrink-0">
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="aspect-square w-20 rounded-full object-cover sm:w-28 md:w-32"
                />
                <span
                  aria-hidden
                  className="w-px self-stretch bg-[repeating-linear-gradient(to_bottom,#d4d4d4_0_10px,transparent_10px_16px)] dark:bg-[repeating-linear-gradient(to_bottom,#525252_0_10px,transparent_10px_16px)]"
                />
              </div>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col justify-center pl-3 sm:pl-5">
              <h1 className="text-lg leading-tight tracking-tight sm:text-3xl md:text-4xl">
                {data.name}
              </h1>
              <p className="mt-0.5 text-sm text-neutral-800 sm:mt-2 sm:text-lg dark:text-neutral-200">
                {data.profession}
              </p>
            </div>
          </div>
          <DottedRule fullWidth />
          {data.description ? (
            <div id="about" className="px-4 py-4 sm:px-6 sm:py-5">
              <h2 className="text-[11px] tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
                About
              </h2>
              <p className="mt-3 text-sm text-neutral-500 sm:mt-4 sm:text-base dark:text-neutral-400">
                {data.description}
              </p>
            </div>
          ) : null}
          <DottedRule fullWidth />
          {(() => {
            const links = [
              data.socialLinks.email
                ? { href: `mailto:${data.socialLinks.email}`, label: "Mail" }
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
            ].filter((link): link is { href: string; label: string } => link !== null);

            if (links.length === 0) {
              return null;
            }

            return (
              <div className="flex flex-wrap items-center gap-y-2 px-4 py-4 text-xs text-neutral-500 sm:px-6 sm:py-5 sm:text-sm dark:text-neutral-400 [&_a]:underline [&_a]:decoration-neutral-400 [&_a]:underline-offset-4 dark:[&_a]:decoration-neutral-600">
                {links.map((link, index) => (
                  <span key={link.href} className="flex items-center">
                    {index > 0 ? (
                      <span
                        aria-hidden
                        className="mx-3 h-3 w-px bg-[repeating-linear-gradient(to_bottom,#d4d4d4_0_3px,transparent_3px_5px)] sm:mx-4 dark:bg-[repeating-linear-gradient(to_bottom,#525252_0_3px,transparent_3px_5px)]"
                      />
                    ) : null}
                    <SoftClickLink href={link.href}>{link.label}</SoftClickLink>
                    {link.href.startsWith("mailto:") && data.socialLinks.email ? (
                      <CopyEmailButton email={data.socialLinks.email} />
                    ) : null}
                  </span>
                ))}
              </div>
            );
          })()}
          <DottedRule fullWidth />
        </motion.section>

        <motion.section
          id="work"
          className="px-4 py-10 sm:px-6 sm:py-16"
          variants={dropIn}
        >
            <h2 className="text-[11px] tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
              Selected work
            </h2>
            <motion.ul
              className="mt-4 flex flex-col gap-4 sm:mt-6 sm:gap-6"
              variants={listStagger}
            >
              {data.projects.map((project) => {
                const href = project.url?.trim();
                const isExternal = Boolean(href && /^https?:\/\//.test(href));

                return (
                  <motion.li key={project.id} variants={dropIn}>
                    <div className="flex items-baseline justify-between gap-3 sm:gap-4">
                      {href ? (
                        <SoftClickLink
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1"
                        >
                          <h3 className="text-base tracking-tight underline decoration-neutral-950 underline-offset-4 sm:text-lg dark:decoration-neutral-50">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="size-3.5 shrink-0 sm:size-4" />
                        </SoftClickLink>
                      ) : (
                        <h3 className="text-base tracking-tight sm:text-lg">
                          {project.title}
                        </h3>
                      )}
                      {project.tags?.[0] ? (
                        <span className="shrink-0 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                          {project.tags[0]}
                        </span>
                      ) : null}
                    </div>
                    {project.description ? (
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {project.description}
                      </p>
                    ) : null}
                  </motion.li>
                );
              })}
            </motion.ul>
        </motion.section>

        <DottedRule />

        <motion.section
          className="px-4 py-10 sm:px-6 sm:py-16"
          variants={dropIn}
        >
            <h2 className="text-[11px] tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
              About
            </h2>
            <div className="mt-4 flex flex-col gap-6 sm:mt-6 sm:gap-8">
              <div>
                <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                  Experience
                </p>
                <motion.ul
                  className="mt-2 flex flex-col gap-2.5 sm:mt-3 sm:gap-3"
                  variants={listStagger}
                >
                  {data.experiences.map((experience) => (
                    <motion.li
                      key={experience.id}
                      className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm sm:text-base"
                      variants={dropIn}
                    >
                      <span>
                        {experience.role}, {experience.company}
                      </span>
                      <span className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                        {experience.startDate}
                        {experience.endDate ? ` – ${experience.endDate}` : ""}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div>
                <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                  Education
                </p>
                <motion.ul
                  className="mt-2 flex flex-col gap-2 sm:mt-3"
                  variants={listStagger}
                >
                  {data.education.map((item) => (
                    <motion.li
                      key={item.id}
                      className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm sm:text-base"
                      variants={dropIn}
                    >
                      <span>
                        {item.degree}
                        {item.field ? ` ${item.field}` : ""}, {item.institution}
                      </span>
                      <span className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                        {item.endDate}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div>
                <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                  Skills
                </p>
                <p className="mt-2 text-sm text-neutral-800 sm:mt-3 sm:text-base dark:text-neutral-200">
                  {data.skills.map((skill) => skill.name).join("  ·  ")}
                </p>
              </div>
            </div>
        </motion.section>

        <motion.div className="border-line-dash-b relative" aria-hidden variants={dropIn}>
          <span className="line-cross bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <span className="line-cross right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        </motion.div>

        <motion.footer
          className="px-4 py-6 text-center sm:px-6 sm:py-8"
          variants={dropIn}
        >
          <p className="text-[11px] tracking-wide text-neutral-400 sm:text-xs dark:text-neutral-500">
            Crafting digital experience with love ❤️
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
