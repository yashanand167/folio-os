import { designSystem } from "@/components/templates/minimal/design-system";
import { samplePortfolio } from "@/components/templates/minimal/data";
import type { Portfolio } from "@/types/portfolio";

export default function MinimalPage({
  data = samplePortfolio,
}: {
  data?: Portfolio;
}) {
  const { colors, typography, spacing } = designSystem;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#ffffff",
        color: colors.primary,
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        lineHeight: typography.lineHeight,
      }}
    >
      <div
        className="mx-auto w-full max-w-xl"
        style={{
          paddingInline: spacing.padding * 1.5,
          paddingBlock: spacing.padding * 4,
        }}
      >
        <header className="flex items-baseline justify-between gap-4">
          <p className="text-sm tracking-tight">{data.name}</p>
          <nav className="flex gap-4 text-sm" style={{ color: colors.tertiary }}>
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <section style={{ marginTop: spacing.margin * 5 }}>
          <h1 className="text-4xl tracking-tight sm:text-5xl">{data.name}</h1>
          <p className="mt-3 text-lg" style={{ color: colors.secondary }}>
            {data.profession}
          </p>
          <p className="mt-6 max-w-md" style={{ color: colors.tertiary }}>
            I design and build clear, quiet interfaces for products that need to
            feel considered.
          </p>
        </section>

        <section id="work" style={{ marginTop: spacing.margin * 5 }}>
          <h2 className="text-sm tracking-wide uppercase" style={{ color: colors.tertiary }}>
            Selected work
          </h2>
          <ul className="mt-6 flex flex-col" style={{ gap: spacing.margin * 1.5 }}>
            {data.projects.map((project) => (
              <li key={project.id}>
                <a href={project.url ?? "#"} className="group block">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg tracking-tight">{project.title}</h3>
                    {project.tags?.[0] ? (
                      <span className="text-sm" style={{ color: colors.tertiary }}>
                        {project.tags[0]}
                      </span>
                    ) : null}
                  </div>
                  {project.description ? (
                    <p className="mt-1 text-sm" style={{ color: colors.tertiary }}>
                      {project.description}
                    </p>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" style={{ marginTop: spacing.margin * 5 }}>
          <h2 className="text-sm tracking-wide uppercase" style={{ color: colors.tertiary }}>
            About
          </h2>
          <div className="mt-6 flex flex-col" style={{ gap: spacing.margin * 2 }}>
            <div>
              <p className="text-sm" style={{ color: colors.tertiary }}>
                Experience
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {data.experiences.map((experience) => (
                  <li key={experience.id} className="flex flex-wrap justify-between gap-2">
                    <span>
                      {experience.role}, {experience.company}
                    </span>
                    <span className="text-sm" style={{ color: colors.tertiary }}>
                      {experience.startDate}
                      {experience.endDate ? ` – ${experience.endDate}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.tertiary }}>
                Education
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {data.education.map((item) => (
                  <li key={item.id} className="flex flex-wrap justify-between gap-2">
                    <span>
                      {item.degree}
                      {item.field ? ` ${item.field}` : ""}, {item.institution}
                    </span>
                    <span className="text-sm" style={{ color: colors.tertiary }}>
                      {item.endDate}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.tertiary }}>
                Skills
              </p>
              <p className="mt-3" style={{ color: colors.secondary }}>
                {data.skills.map((skill) => skill.name).join("  ·  ")}
              </p>
            </div>
          </div>
        </section>

        <footer
          className="flex flex-wrap gap-4 text-sm"
          style={{ marginTop: spacing.margin * 5, color: colors.tertiary }}
        >
          {data.socialLinks.email ? (
            <a href={`mailto:${data.socialLinks.email}`}>{data.socialLinks.email}</a>
          ) : null}
          {data.socialLinks.github ? <a href={data.socialLinks.github}>GitHub</a> : null}
          {data.socialLinks.linkedin ? (
            <a href={data.socialLinks.linkedin}>LinkedIn</a>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
