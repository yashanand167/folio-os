"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/stores/portfolio.store";
import { cn } from "@/lib/utils";
import {
  addButtonClassName,
  fieldClassName,
  insetPanelClassName,
} from "@/components/forms/styles";

const SUGGESTED_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "GraphQL",
  "UI/UX Design",
  "Figma",
  "Docker",
  "AI / LLMs",
  "RAG",
  "Prompt Engineering",
  "Redis",
  "System Design",
  "Microservices",
  "Testing",
];

export default function SkillsInfo() {
  const skills = usePortfolioStore((state) => state.draft.skills ?? []);
  const upsertSkill = usePortfolioStore((state) => state.upsertSkill);
  const removeSkill = usePortfolioStore((state) => state.removeSkill);

  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");

  const handleAddSkill = (name: string, skillCategory?: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    if (skills.some((s) => s.name?.toLowerCase() === trimmed.toLowerCase())) return;

    upsertSkill({
      id: `skill_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: trimmed,
      category: skillCategory || category || "General",
    });

    setSkillName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddSkill(skillName, category);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium tracking-tight text-black dark:text-white">
          Skills
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Technologies, frameworks, and skillsets.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={insetPanelClassName}>
        <span className="text-xs tracking-wider text-black uppercase dark:text-white">
          + Add skill
        </span>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <input
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="Skill name (e.g. React) *"
              className={fieldClassName}
              required
            />
          </div>
          <div>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (optional)"
              className={fieldClassName}
            />
          </div>
        </div>

        <button type="submit" className={addButtonClassName}>
          Add skill
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <span className="text-xs tracking-wider text-neutral-400 uppercase">
          Quick suggestions
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_SKILLS.map((item) => {
            const isAdded = skills.some(
              (s) => s.name?.toLowerCase() === item.toLowerCase(),
            );

            return (
              <button
                key={item}
                type="button"
                disabled={isAdded}
                onClick={() => handleAddSkill(item)}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs outline-none transition-colors",
                  isAdded
                    ? "cursor-not-allowed border-black/10 text-neutral-400 dark:border-white/10 dark:text-neutral-600"
                    : "cursor-pointer border-black/15 text-neutral-700 hover:border-black hover:text-black dark:border-white/20 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white",
                )}
              >
                + {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-black/10 pt-3 dark:border-white/10">
        <span className="text-xs tracking-wider text-neutral-400 uppercase">
          Added skills ({skills.length})
        </span>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 rounded-lg border border-black/15 px-3 py-1 text-xs text-black dark:border-white/20 dark:text-white"
            >
              <span>{skill.name}</span>
              {skill.category ? (
                <span className="text-[10px] text-neutral-500 uppercase">
                  [{skill.category}]
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="ml-1 text-neutral-500 hover:text-black dark:hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
