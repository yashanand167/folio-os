"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/stores/portfolio.store";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white transition-colors";

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
        <h2 className="text-base font-medium text-white tracking-tight">
          Skills & Specializations
        </h2>
        <p className="text-xs text-neutral-400">
          Technologies, frameworks, and skillsets.
        </p>
      </div>

      {/* Custom Skill Input */}
      <form onSubmit={handleSubmit} className="p-4 border border-white/15 bg-neutral-950 flex flex-col gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-white">
          + Add Skill
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <input
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="Skill Name (e.g. React) *"
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

        <button
          type="submit"
          className="self-end px-4 py-1.5 bg-white text-black text-xs font-mono uppercase font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          Add Skill
        </button>
      </form>

      {/* Suggested Skills */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          Quick Suggestions
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_SKILLS.map((item) => {
            const isAdded = skills.some((s) => s.name?.toLowerCase() === item.toLowerCase());

            return (
              <button
                key={item}
                type="button"
                disabled={isAdded}
                onClick={() => handleAddSkill(item)}
                className={cn(
                  "px-2.5 py-1 text-xs font-mono border transition-colors outline-none",
                  isAdded
                    ? "border-white/10 text-neutral-600 cursor-not-allowed"
                    : "border-white/20 text-neutral-300 hover:border-white hover:text-white cursor-pointer"
                )}
              >
                + {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Added Skills */}
      <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Added Skills ({skills.length})
        </span>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="px-3 py-1 border border-white/20 bg-transparent text-xs text-white flex items-center gap-2"
            >
              <span>{skill.name}</span>
              {skill.category && (
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  [{skill.category}]
                </span>
              )}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-neutral-500 hover:text-white font-mono ml-1 cursor-pointer"
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

