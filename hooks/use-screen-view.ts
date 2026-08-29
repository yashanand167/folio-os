"use client";

import { useEffect, useState } from "react";

export const screenViews = ["mobile", "tablet", "web"] as const;

export type ScreenView = (typeof screenViews)[number];

function viewFromMedia(): ScreenView {
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "web";
}

export function useScreenView() {
  const [screenView, setScreenView] = useState<ScreenView>("web");
  const [view, setView] = useState<ScreenView>("web");

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

    const sync = () => {
      setScreenView(viewFromMedia());
    };

    sync();
    mobile.addEventListener("change", sync);
    tablet.addEventListener("change", sync);

    return () => {
      mobile.removeEventListener("change", sync);
      tablet.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    setView(screenView);
  }, [screenView]);

  return { view, setView, screenView };
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
