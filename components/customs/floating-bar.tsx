"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FloatingBar({
  label,
  onPrev,
  onNext,
}: {
  label: string;
  onPrev: () => void;
  onNext: () => void;
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
    </div>
  );
}
