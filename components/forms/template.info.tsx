"use client";

import { usePortfolioStore } from "@/stores/portfolio.store";
import { portfolioTypes, type PortfolioType } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const templateCopy: Record<
  PortfolioType,
  { label: string; blurb: string }
> = {
  minimal: {
    label: "Minimal",
    blurb: "Quiet type, lots of space, content first.",
  },
  interactive: {
    label: "Interactive",
    blurb: "Motion and playful interactions.",
  },
  "design-focused": {
    label: "Design focused",
    blurb: "Visual, editorial layout.",
  },
};

export default function TemplateInfo() {
  const portfolioType = usePortfolioStore((state) => state.draft.portfolioType);
  const patchDraft = usePortfolioStore((state) => state.patchDraft);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium tracking-tight text-black dark:text-white">
          Choose a template
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          You can change this later. Pick the look that fits you.
        </p>
      </div>

      <div className="grid gap-3">
        {portfolioTypes.map((type) => {
          const selected = portfolioType === type;
          const copy = templateCopy[type];

          return (
            <button
              key={type}
              type="button"
              onClick={() => patchDraft({ portfolioType: type })}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors outline-none",
                selected
                  ? "border-black bg-neutral-100 dark:border-white dark:bg-neutral-800"
                  : "border-black/10 hover:border-black/30 dark:border-white/15 dark:hover:border-white/40",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {copy.label}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {copy.blurb}
                  </p>
                </div>
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                    selected
                      ? "border-black bg-black dark:border-white dark:bg-white"
                      : "border-black/25 dark:border-white/25",
                  )}
                >
                  {selected ? (
                    <span className="size-1.5 rounded-full bg-white dark:bg-black" />
                  ) : null}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
