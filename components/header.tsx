import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { AuthDialog } from "@/components/customs/auth-dialog";
import { CornerStrokes } from "@/components/corner-strokes";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header({ end }: { end?: ReactNode }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-auto mx-auto max-w-6xl px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative flex items-center justify-between bg-neutral-100/80 px-4 py-3 text-black backdrop-blur-xl sm:px-6 sm:py-3.5 dark:bg-neutral-800/80 dark:text-white">
          <CornerStrokes className="border-black dark:border-white" />
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-blue-400 tracking-tight">
          <Image src="/FolioOS.png" alt="Folio OS" width={40} height={40} />
            Folio OS
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium sm:gap-5">
            <ThemeToggle />
            <span className="h-4 w-px bg-black/40 dark:bg-white/40" />
            {end ?? (
              <>
                <Link href="/templates" className="hidden sm:inline">
                  View templates
                </Link>
                <AuthDialog triggerClassName="bg-black px-3 py-1.5 text-white dark:bg-white dark:text-black">
                  Get started →
                </AuthDialog>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

