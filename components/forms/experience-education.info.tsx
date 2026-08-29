"use client";

import { useState } from "react";
import { usePortfolioStore, DraftExperience, DraftEducation } from "@/stores/portfolio.store";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white transition-colors";

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
        <h2 className="text-base font-medium text-white tracking-tight">
          Experience & Education
        </h2>
        <p className="text-xs text-neutral-400">
          Career history and academic qualifications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border border-white/20">
        <button
          type="button"
          onClick={() => setTab("experience")}
          className={cn(
            "flex-1 py-2 px-3 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer",
            tab === "experience"
              ? "bg-white text-black font-semibold"
              : "bg-transparent text-neutral-400 hover:text-white"
          )}
        >
          Work ({experiences.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("education")}
          className={cn(
            "flex-1 py-2 px-3 text-xs font-mono uppercase tracking-wider transition-all border-l border-white/20 cursor-pointer",
            tab === "education"
              ? "bg-white text-black font-semibold"
              : "bg-transparent text-neutral-400 hover:text-white"
          )}
        >
          Education ({education.length})
        </button>
      </div>

      {/* Experience Tab */}
      {tab === "experience" && (
        <div className="flex flex-col gap-4">
          <form onSubmit={handleAddExperience} className="p-4 border border-white/15 bg-neutral-950 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              + Add Work Entry
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                placeholder="Start Date (e.g. 2022)"
                className={fieldClassName}
              />
              <input
                value={expForm.endDate}
                onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                placeholder="End Date (e.g. Present)"
                className={fieldClassName}
              />
            </div>

            <textarea
              value={expForm.description}
              onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
              placeholder="Description or key achievements..."
              rows={2}
              className={`${fieldClassName} resize-none`}
            />

            <button
              type="submit"
              className="self-end px-4 py-1.5 bg-white text-black text-xs font-mono uppercase font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Add Experience
            </button>
          </form>

          {/* List */}
          <div className="flex flex-col gap-2">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-3 border border-white/15 bg-transparent flex items-start justify-between gap-3"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <span>{exp.role}</span>
                    <span className="text-neutral-400 font-mono text-xs">@ {exp.company}</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                  {exp.description && (
                    <p className="text-xs text-neutral-300 pt-1">{exp.description}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-xs text-neutral-500 hover:text-white font-mono underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Tab */}
      {tab === "education" && (
        <div className="flex flex-col gap-4">
          <form onSubmit={handleAddEducation} className="p-4 border border-white/15 bg-neutral-950 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              + Add Education Entry
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={eduForm.institution}
                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
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
                onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })}
                placeholder="Start Year"
                className={fieldClassName}
              />
              <input
                value={eduForm.endDate}
                onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                placeholder="End Year"
                className={fieldClassName}
              />
            </div>

            <button
              type="submit"
              className="self-end px-4 py-1.5 bg-white text-black text-xs font-mono uppercase font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Add Degree
            </button>
          </form>

          {/* List */}
          <div className="flex flex-col gap-2">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-3 border border-white/15 bg-transparent flex items-start justify-between gap-3"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <span>{edu.degree}</span>
                    <span className="text-neutral-400 font-mono text-xs">@ {edu.institution}</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {edu.startDate} – {edu.endDate || "Present"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-xs text-neutral-500 hover:text-white font-mono underline cursor-pointer"
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

