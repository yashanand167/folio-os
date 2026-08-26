import Link from "next/link";

import { CornerStrokes } from "@/components/corner-strokes";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-auto mx-auto max-w-6xl px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative flex items-center justify-between bg-neutral-100/80 px-4 py-4 text-black backdrop-blur-xl sm:px-6 sm:py-5 dark:bg-neutral-800/80 dark:text-white">
          <CornerStrokes className="border-black dark:border-white" />
          <Link href="/" className="text-sm tracking-tight">
            Folio OS
          </Link>
          <div className="flex items-center gap-4 text-sm sm:gap-5">
            <ThemeToggle />
            <Link href="/templates" className="hidden sm:inline">
              View templates
            </Link>
            <button
              type="button"
              className="bg-black px-3 py-1.5 text-white dark:bg-white dark:text-black"
            >
              Get started →
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

