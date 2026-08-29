"use client";

import { useEffect, useState } from "react";

import FloatingBar from "@/components/customs/floating-bar";
import { templates } from "@/components/templates/registry";
import { previewFrameWidth, useScreenView } from "@/hooks/use-screen-view";
import { cn } from "@/lib/utils";

export default function Templates() {
  const [index, setIndex] = useState(0);
  const { view, setView, screenView } = useScreenView();
  const current = templates[index];
  const Page = current.Page;
  const frameWidth = previewFrameWidth(view, screenView);

  useEffect(() => {
    if (!frameWidth) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [frameWidth]);

  return (
    <div
      className={cn(
        "relative min-h-screen",
        frameWidth && "h-dvh overflow-hidden bg-neutral-200 dark:bg-neutral-900",
      )}
    >
      {frameWidth ? (
        <iframe
          key={`${current.id}-${view}`}
          title={`${current.label} ${view} preview`}
          src={`/templates/preview/${current.id}`}
          className="fixed inset-y-0 left-1/2 z-10 -translate-x-1/2 border-x border-black/15 bg-white dark:border-white/15 dark:bg-black"
          style={{ width: frameWidth, height: "100dvh" }}
        />
      ) : (
        <Page key={current.id} />
      )}
      <FloatingBar
        label={current.label}
        view={view}
        screenView={screenView}
        onViewChange={setView}
        onPrev={() =>
          setIndex((value) => (value - 1 + templates.length) % templates.length)
        }
        onNext={() => setIndex((value) => (value + 1) % templates.length)}
      />
    </div>
  );
}
