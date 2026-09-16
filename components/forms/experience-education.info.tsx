"use client";

import { useState } from "react";
import {
  usePortfolioStore,
  type DraftEducation,
  type DraftExperience,
} from "@/stores/portfolio.store";
import { cn } from "@/lib/utils";
import {
  addButtonClassName,
  fieldClassName,
  insetPanelClassName,
  listItemClassName,
} from "@/components/forms/styles";

export default function ExperienceEducationInfo() {
  const experiences = usePortfolioStore((state) => state.draft.experiences ?? []);
  const education = usePortfolioStore((state) => state.draft.education ?? []);
  const upsertExperience = usePortfolioStore((state) => state.upsertExperience);
  const removeExperience = usePortfolioStore((state) => state.removeExperience);
  const upsertEducation = usePortfolioStore((state) => state.upsertEducation);
  const removeEducation = usePortfolioStore((state) => state.removeEducation);

  const [tab, setTab] = useState<"experience" | "education">("experience");

  const [expForm, setExpForm] = useState<Partial<DraftExperience>>({
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [eduForm, setEduForm] = useState<Partial<DraftEducation>>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.company || !expForm.role) return;

    upsertExperience({
      id: expForm.id || `exp_${Date.now()}`,
      company: expForm.company,
      role: expForm.role,
      location: expForm.location || "",
      startDate: expForm.startDate || "2022",
      endDate: expForm.endDate || "Present",
      description: expForm.description || "",
    });

    setExpForm({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.institution || !eduForm.degree) return;

    upsertEducation({
      id: eduForm.id || `edu_${Date.now()}`,
      institution: eduForm.institution,
      degree: eduForm.degree,
      field: eduForm.field || "",
      startDate: eduForm.startDate || "2018",
      endDate: eduForm.endDate || "2022",
      description: eduForm.description || "",
    });

    setEduForm({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium tracking-tight text-black dark:text-white">
          Experience & education
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Career history and academic qualifications.
        </p>
      </div>

      <div className="flex overflow-hidden rounded-lg border border-black/15 dark:border-white/20">
        <button
          type="button"
          onClick={() => setTab("experience")}
          className={cn(
            "flex-1 px-3 py-2 text-xs tracking-wider uppercase transition-all",
            tab === "experience"
              ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
              : "bg-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white",
          )}
        >
          Work ({experiences.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("education")}
          className={cn(
            "flex-1 border-l border-black/15 px-3 py-2 text-xs tracking-wider uppercase transition-all dark:border-white/20",
            tab === "education"
              ? "bg-black font-semibold text-white dark:bg-white dark:text-black"
              : "bg-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white",
          )}
        >
          Education ({education.length})
        </button>
      </div>

      {tab === "experience" ? (
        <div className="flex flex-col gap-4">
          <form onSubmit={handleAddExperience} className={insetPanelClassName}>
            <span className="text-xs tracking-wider text-black uppercase dark:text-white">
              + Add work entry
            </span>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={expForm.company}
                onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                placeholder="Company *"
                className={fieldClassName}
                required
              />
              <input
                value={expForm.role}
                onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                placeholder="Role / Title *"
                className={fieldClassName}
                required
              />
              <input
                value={expForm.startDate}
                onChange={(e) =>
                  setExpForm({ ...expForm, startDate: e.target.value })
                }
                placeholder="Start date (e.g. 2022)"
                className={fieldClassName}
              />
              <input
                value={expForm.endDate}
                onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                placeholder="End date (e.g. Present)"
                className={fieldClassName}
              />
            </div>

            <textarea
              value={expForm.description}
              onChange={(e) =>
                setExpForm({ ...expForm, description: e.target.value })
              }
              placeholder="Description or key achievements..."
              rows={2}
              className={`${fieldClassName} resize-none`}
            />

            <button type="submit" className={addButtonClassName}>
              Add experience
            </button>
          </form>

          <div className="flex flex-col gap-2">
            {experiences.map((exp) => (
              <div key={exp.id} className={listItemClassName}>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                    <span>{exp.role}</span>
                    <span className="text-xs text-neutral-500">
                      @ {exp.company}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                  {exp.description ? (
                    <p className="pt-1 text-xs text-neutral-600 dark:text-neutral-300">
                      {exp.description}
                    </p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-xs text-neutral-500 underline hover:text-black dark:hover:text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <form onSubmit={handleAddEducation} className={insetPanelClassName}>
            <span className="text-xs tracking-wider text-black uppercase dark:text-white">
              + Add education entry
            </span>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={eduForm.institution}
                onChange={(e) =>
                  setEduForm({ ...eduForm, institution: e.target.value })
                }
                placeholder="Institution *"
                className={fieldClassName}
                required
              />
              <input
                value={eduForm.degree}
                onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                placeholder="Degree *"
                className={fieldClassName}
                required
              />
              <input
                value={eduForm.startDate}
                onChange={(e) =>
                  setEduForm({ ...eduForm, startDate: e.target.value })
                }
                placeholder="Start year"
                className={fieldClassName}
              />
              <input
                value={eduForm.endDate}
                onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                placeholder="End year"
                className={fieldClassName}
              />
            </div>

            <button type="submit" className={addButtonClassName}>
              Add degree
            </button>
          </form>

          <div className="flex flex-col gap-2">
            {education.map((edu) => (
              <div key={edu.id} className={listItemClassName}>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                    <span>{edu.degree}</span>
                    <span className="text-xs text-neutral-500">
                      @ {edu.institution}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    {edu.startDate} – {edu.endDate || "Present"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-xs text-neutral-500 underline hover:text-black dark:hover:text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
