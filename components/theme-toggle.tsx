"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { playSwitchOff } from "@/lib/switch-off";
import { playSwitchOn } from "@/lib/switch-on";

const hint = {
  rest: { opacity: 0, y: 6, scale: 0.96 },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
    <motion.div
      className="relative flex items-center justify-center"
      initial="rest"
      whileHover="hover"
    >
      <motion.button
        type="button"
        className="inline-flex size-7 items-center justify-center"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
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
      </motion.button>
      <motion.span
        variants={hint}
        className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-nowrap bg-neutral-100/90 px-2 py-1 text-[10px] tracking-wide text-black backdrop-blur-sm dark:bg-neutral-800/90 dark:text-white"
      >
        {isDark ? "Press L for light" : "Press D for dark"}
      </motion.span>
    </motion.div>
  );
}
