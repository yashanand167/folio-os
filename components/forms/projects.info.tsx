"use client";

import { useState } from "react";
import { usePortfolioStore, DraftProject } from "@/stores/portfolio.store";

const fieldClassName =
  "w-full border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white transition-colors";

export default function ProjectsInfo() {
  const projects = usePortfolioStore((state) => state.draft.projects ?? []);
  const upsertProject = usePortfolioStore((state) => state.upsertProject);
  const removeProject = usePortfolioStore((state) => state.removeProject);

  const [form, setForm] = useState<Partial<DraftProject> & { tagsInput?: string }>({
    title: "",
    description: "",
    url: "",
    image: "",
    tagsInput: "",
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const tagsArray = form.tagsInput
      ? form.tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    upsertProject({
      id: form.id || `proj_${Date.now()}`,
      title: form.title,
      description: form.description || "",
      url: form.url || undefined,
      image: form.image || undefined,
      tags: tagsArray,
    });

    setForm({
      title: "",
      description: "",
      url: "",
      image: "",
      tagsInput: "",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium text-white tracking-tight">
          Featured Projects
        </h2>
        <p className="text-xs text-neutral-400">
          Showcase key projects, repositories, or live applications.
        </p>
      </div>

      {/* Add Project Form */}
      <form onSubmit={handleAddProject} className="p-4 border border-white/15 bg-neutral-950 flex flex-col gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-white">
          + Add Project
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Project Title *"
            className={fieldClassName}
            required
          />
          <input
            value={form.url || ""}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="Project URL (https://...)"
            className={fieldClassName}
          />
        </div>

        <textarea
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short description (10-40 words)..."
          rows={2}
          className={`${fieldClassName} resize-none`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Cover Image URL (optional)"
            className={fieldClassName}
          />
          <input
            value={form.tagsInput || ""}
            onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
            placeholder="Tags (React, Next.js, etc.)"
            className={fieldClassName}
          />
        </div>

        <button
          type="submit"
          className="self-end px-4 py-1.5 bg-white text-black text-xs font-mono uppercase font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          Add Project
        </button>
      </form>

      {/* Projects List */}
      <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Projects Showcase ({projects.length})
        </span>

        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-3.5 border border-white/15 bg-transparent flex items-start justify-between gap-3"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{project.title}</span>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-neutral-400 hover:text-white underline font-mono"
                    >
                      [link]
                    </a>
                  )}
                </div>

                {project.description && (
                  <p className="text-xs text-neutral-300">{project.description}</p>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 border border-white/15 text-neutral-400 text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-xs text-neutral-500 hover:text-white font-mono underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

