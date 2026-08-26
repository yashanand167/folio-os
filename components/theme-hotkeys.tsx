"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { playSwitchOff } from "@/lib/switch-off";
import { playSwitchOn } from "@/lib/switch-on";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function ThemeHotkeys() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();

      if (key === "d" && resolvedTheme !== "dark") {
        playSwitchOff();
        setTheme("dark");
      }

      if (key === "l" && resolvedTheme !== "light") {
        playSwitchOn();
        setTheme("light");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme]);

  return null;
}
