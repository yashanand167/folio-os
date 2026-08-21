import { designSystem } from "@/components/templates/minimal/design-system";
import { samplePortfolio } from "@/components/templates/minimal/data";
import { SoftClickLink } from "@/components/templates/minimal/soft-click-link";
import { ThemeToggle } from "@/components/templates/minimal/theme-toggle";
import type { Portfolio } from "@/types/portfolio";

export default function MinimalPage({
  data = samplePortfolio,
}: {
  data?: Portfolio;
}) {
  const { typography, spacing } = designSystem;

  return (
    <div
      className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50"
      style={{
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        lineHeight: typography.lineHeight,
      }}
    >
      <div className="mx-auto min-h-screen w-full max-w-4xl border-x border-dotted border-neutral-300 dark:border-neutral-700">
        <header
          className="flex items-center justify-between gap-4 border-b border-dotted border-neutral-300 dark:border-neutral-700"
          style={{
            paddingInline: spacing.padding * 1.5,
            paddingTop: spacing.padding * 4,
            paddingBottom: spacing.padding,
          }}
        >
          <p className="text-sm tracking-tight">{data.name}</p>
          <nav className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-4">
              <SoftClickLink href="#work">Work</SoftClickLink>
              <SoftClickLink href="#about">About</SoftClickLink>
              {data.resumeUrl ? (
                <SoftClickLink href={data.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </SoftClickLink>
              ) : null}
            </div>
            <span
              aria-hidden
              className="h-3.5 w-px bg-neutral-300 dark:bg-neutral-600"
            />
            <ThemeToggle />
          </nav>
        </header>

        <div
          style={{
            paddingInline: spacing.padding * 1.5,
            paddingBottom: spacing.padding * 4,
          }}
        >
          <section
            className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
            style={{ marginTop: spacing.margin * 5 }}
          >
            <div>
              <h1 className="text-4xl tracking-tight sm:text-5xl">{data.name}</h1>
              <p className="mt-3 text-lg text-neutral-800 dark:text-neutral-200">
                {data.profession}
              </p>
              <p className="mt-6 max-w-md text-neutral-500 dark:text-neutral-400">
                I design and build clear, quiet interfaces for products that need to
                feel considered.
              </p>
            </div>
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.name}
                className="aspect-[3/4] w-40 object-cover sm:w-48"
              />
            ) : null}
          </section>

          <section id="work" style={{ marginTop: spacing.margin * 5 }}>
            <h2 className="text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Selected work
            </h2>
            <ul className="mt-6 flex flex-col" style={{ gap: spacing.margin * 1.5 }}>
              {data.projects.map((project) => (
                <li key={project.id}>
                  <SoftClickLink href={project.url ?? "#"} className="block">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg tracking-tight">{project.title}</h3>
                      {project.tags?.[0] ? (
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {project.tags[0]}
                        </span>
                      ) : null}
                    </div>
                    {project.description ? (
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {project.description}
                      </p>
                    ) : null}
                  </SoftClickLink>
                </li>
              ))}
            </ul>
          </section>

          <section id="about" style={{ marginTop: spacing.margin * 5 }}>
            <h2 className="text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              About
            </h2>
            <div className="mt-6 flex flex-col" style={{ gap: spacing.margin * 2 }}>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Experience
                </p>
                <ul className="mt-3 flex flex-col gap-3">
                  {data.experiences.map((experience) => (
                    <li
                      key={experience.id}
                      className="flex flex-wrap justify-between gap-2"
                    >
                      <span>
                        {experience.role}, {experience.company}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {experience.startDate}
                        {experience.endDate ? ` – ${experience.endDate}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Education
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {data.education.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap justify-between gap-2"
                    >
                      <span>
                        {item.degree}
                        {item.field ? ` ${item.field}` : ""}, {item.institution}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {item.endDate}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Skills
                </p>
                <p className="mt-3 text-neutral-800 dark:text-neutral-200">
                  {data.skills.map((skill) => skill.name).join("  ·  ")}
                </p>
              </div>
            </div>
          </section>

          <footer
            className="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400"
            style={{ marginTop: spacing.margin * 5 }}
          >
            {data.socialLinks.email ? (
              <SoftClickLink href={`mailto:${data.socialLinks.email}`}>
                {data.socialLinks.email}
              </SoftClickLink>
            ) : null}
            {data.socialLinks.github ? (
              <SoftClickLink href={data.socialLinks.github}>GitHub</SoftClickLink>
            ) : null}
            {data.socialLinks.linkedin ? (
              <SoftClickLink href={data.socialLinks.linkedin}>LinkedIn</SoftClickLink>
            ) : null}
            {data.resumeUrl ? (
              <SoftClickLink href={data.resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </SoftClickLink>
            ) : null}
          </footer>
        </div>
      </div>
    </div>
  );
}
