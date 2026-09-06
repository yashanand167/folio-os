"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";

export const screenViews = ["mobile", "tablet", "web"] as const;

export type ScreenView = (typeof screenViews)[number];

function viewFromWidth(): ScreenView {
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "web";
}

function getServerSnapshot(): ScreenView {
  return "web";
}

function subscribe(onChange: () => void) {
  const mobile = window.matchMedia("(max-width: 767px)");
  const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

  mobile.addEventListener("change", onChange);
  tablet.addEventListener("change", onChange);

  return () => {
    mobile.removeEventListener("change", onChange);
    tablet.removeEventListener("change", onChange);
  };
}

export function useScreenView() {
  const screenView = useSyncExternalStore(
    subscribe,
    viewFromWidth,
    getServerSnapshot,
  );
  const [selected, setSelected] = useState<ScreenView | null>(null);
  const [selectedOn, setSelectedOn] = useState(screenView);

  if (selectedOn !== screenView) {
    setSelectedOn(screenView);
    setSelected(null);
  }

  const setView = useCallback(
    (next: ScreenView) => {
      if (screenView === "mobile" && next !== "mobile") {
        toast.error(
          next === "web"
            ? "Web view isn't available on mobile."
            : "Tablet view isn't available on mobile.",
        );
        return;
      }

      setSelected(next);
    },
    [screenView],
  );

  return {
    view: selected ?? screenView,
    setView,
    screenView,
  };
}

export function previewFrameWidth(
  view: ScreenView,
  screenView: ScreenView,
): number | null {
  if (view === "web" || screenView === "mobile") return null;
  if (view === "tablet" && screenView === "web") return 768;
  if (view === "mobile") return 390;
  return null;
}
