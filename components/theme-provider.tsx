"use client";

import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ThemeHotkeys } from "@/components/theme-hotkeys";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeHotkeys />
      {children}
    </NextThemesProvider>
  );
}
