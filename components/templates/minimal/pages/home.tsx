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
  const { typography } = designSystem;

  return (
    <div
      className="min-h-screen bg-white text-[15px] text-neutral-950 sm:text-base dark:bg-neutral-950 dark:text-neutral-50"
      style={{
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeight,
        lineHeight: typography.lineHeight,
      }}
    >
      <div className="border-line-dash-x mx-5 min-h-screen w-auto max-w-3xl sm:mx-8 sm:max-w-4xl md:mx-auto">
        <header
          className="border-line-dash-b flex items-center justify-between gap-3 px-4 pt-8 pb-3 sm:gap-4 sm:px-6 sm:pt-16 sm:pb-4"
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
            <span
              aria-hidden
              className="border-line-dash-l h-4"
            />
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
        </header>

        <div className="px-4 pb-10 sm:px-6 sm:pb-16">
          <section className="mt-8 flex flex-col gap-6 sm:mt-20 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <h1 className="text-[1.75rem] leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {data.name}
              </h1>
              <p className="mt-2 text-base text-neutral-800 sm:mt-3 sm:text-lg dark:text-neutral-200">
                {data.profession}
              </p>
              <p className="mt-4 max-w-md text-sm text-neutral-500 sm:mt-6 sm:text-base dark:text-neutral-400">
                I design and build clear, quiet interfaces for products that need to
                feel considered.
              </p>
            </div>
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt={data.name}
                className="aspect-[3/4] w-28 object-cover sm:w-40 md:w-48"
              />
            ) : null}
          </section>

          <section id="work" className="mt-10 sm:mt-20">
            <h2 className="text-[11px] tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
              Selected work
            </h2>
            <ul className="mt-4 flex flex-col gap-4 sm:mt-6 sm:gap-6">
              {data.projects.map((project) => (
                <li key={project.id}>
                  <SoftClickLink href={project.url ?? "#"} className="block">
                    <div className="flex items-baseline justify-between gap-3 sm:gap-4">
                      <h3 className="text-base tracking-tight sm:text-lg">{project.title}</h3>
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
                  </SoftClickLink>
                </li>
              ))}
            </ul>
          </section>

          <section id="about" className="mt-10 sm:mt-20">
            <h2 className="text-[11px] tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
              About
            </h2>
            <div className="mt-4 flex flex-col gap-6 sm:mt-6 sm:gap-8">
              <div>
                <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                  Experience
                </p>
                <ul className="mt-2 flex flex-col gap-2.5 sm:mt-3 sm:gap-3">
                  {data.experiences.map((experience) => (
                    <li
                      key={experience.id}
                      className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm sm:text-base"
                    >
                      <span>
                        {experience.role}, {experience.company}
                      </span>
                      <span className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                        {experience.startDate}
                        {experience.endDate ? ` – ${experience.endDate}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                  Education
                </p>
                <ul className="mt-2 flex flex-col gap-2 sm:mt-3">
                  {data.education.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm sm:text-base"
                    >
                      <span>
                        {item.degree}
                        {item.field ? ` ${item.field}` : ""}, {item.institution}
                      </span>
                      <span className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                        {item.endDate}
                      </span>
                    </li>
                  ))}
                </ul>
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
          </section>
        </div>

        <div className="border-line-dash-b relative" aria-hidden>
          <span className="line-cross bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <span className="line-cross right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        </div>

        <footer className="flex flex-wrap gap-3 px-4 py-8 text-xs text-neutral-500 sm:gap-4 sm:px-6 sm:py-16 sm:text-sm dark:text-neutral-400">
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
  );
}
