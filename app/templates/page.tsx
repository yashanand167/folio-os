"use client";

import { useState } from "react";

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

  return (
    <div
      className={cn(
        "relative min-h-screen",
        frameWidth &&
          "flex justify-center bg-neutral-200 py-8 dark:bg-neutral-900",
      )}
    >
      {frameWidth ? (
        <div
          className="h-dvh max-w-full overflow-hidden border border-black/15 bg-white dark:border-white/15 dark:bg-black"
          style={{ width: frameWidth }}
        >
          <iframe
            key={`${current.id}-${view}`}
            title={`${current.label} ${view} preview`}
            src={`/templates/preview/${current.id}`}
            width={frameWidth}
            height={844}
            className="h-full w-full border-0"
          />
        </div>
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
