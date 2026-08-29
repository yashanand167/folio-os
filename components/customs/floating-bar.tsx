"use client";

import { ChevronLeft, ChevronRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { toast } from "sonner";

import type { ScreenView } from "@/hooks/use-screen-view";
import { cn } from "@/lib/utils";

const views = [
  { id: "web" as const, label: "Web", Icon: Monitor },
  { id: "tablet" as const, label: "Tablet", Icon: Tablet },
  { id: "mobile" as const, label: "Mobile", Icon: Smartphone },
];

export default function FloatingBar({
  label,
  onPrev,
  onNext,
  view,
  screenView,
  onViewChange,
}: {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  view: ScreenView;
  screenView: ScreenView;
  onViewChange: (view: ScreenView) => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex w-fit -translate-x-1/2 items-center gap-2 rounded-full bg-neutral-950 px-2 py-2 text-white shadow-lg dark:bg-white dark:text-neutral-950">
      <button
        type="button"
        aria-label="Previous template"
        className="inline-flex size-8 items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-black/10"
        onClick={onPrev}
      >
        <ChevronLeft className="size-4" />
      </button>
      <p className="min-w-28 text-center text-sm font-medium">Type: {label}</p>
      <button
        type="button"
        aria-label="Next template"
        className="inline-flex size-8 items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-black/10"
        onClick={onNext}
      >
        <ChevronRight className="size-4" />
      </button>
      <span className="mx-1 h-4 w-px bg-white/25 dark:bg-black/20" />
      <div className="flex items-center gap-0.5">
        {views.map(({ id, label: viewLabel, Icon }) => (
          <button
            key={id}
            type="button"
            aria-label={`${viewLabel} view`}
            aria-pressed={view === id}
            title={
              screenView === id
                ? `${viewLabel} view · matches this screen`
                : `${viewLabel} view`
            }
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full",
              view === id
                ? "bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white"
                : "hover:bg-white/10 dark:hover:bg-black/10",
            )}
            onClick={() => {
              if (screenView === "mobile" && id !== "mobile") {
                toast.error(
                  id === "web"
                    ? "Web view isn't available on mobile."
                    : "Tablet view isn't available on mobile.",
                );
                return;
              }
              onViewChange(id);
            }}
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
