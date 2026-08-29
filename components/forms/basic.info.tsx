"use client";

import { usePortfolioStore } from "@/stores/portfolio.store";

const fieldClassName =
  "border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/30";

export default function BasicInfo() {
  const name = usePortfolioStore((state) => state.draft.name ?? "");
  const profession = usePortfolioStore((state) => state.draft.profession ?? "");
  const description = usePortfolioStore((state) => state.draft.description ?? "");
  const patchDraft = usePortfolioStore((state) => state.patchDraft);

  return (
    <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">Name</span>
        <input
          value={name}
          onChange={(event) => patchDraft({ name: event.target.value })}
          placeholder="Alex Rivera"
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">Profession</span>
        <input
          value={profession}
          onChange={(event) => patchDraft({ profession: event.target.value })}
          placeholder="Designer & Developer"
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-white/50">About</span>
        <textarea
          value={description}
          onChange={(event) => patchDraft({ description: event.target.value })}
          placeholder="A short bio, 10–40 words."
          rows={4}
          className={`${fieldClassName} resize-none`}
        />
      </label>
    </form>
  );
}
