"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { playSwitchOff } from "@/lib/switch-off";
import { playSwitchOn } from "@/lib/switch-on";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex size-7 items-center justify-center"
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="inline-flex size-7 items-center justify-center"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        if (isDark) {
          playSwitchOn();
          setTheme("light");
        } else {
          playSwitchOff();
          setTheme("dark");
        }
      }}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
