"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

import { ThemeToggle } from "@/components/theme-toggle";

function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-medium tracking-tight text-blue-400"
    >
      <Image src="/FolioOS.png" alt="Folio OS" width={32} height={32} />
      Folio OS
    </Link>
  );
}

function HeaderShell({
  children,
  barClassName,
}: {
  children: ReactNode;
  barClassName: string;
}) {
  return (
    <div className="relative px-6">
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 size-6 bg-black dark:bg-white"
      >
        <span className="block size-full rounded-tr-[24px] bg-background" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 size-6 bg-black dark:bg-white"
      >
        <span className="block size-full rounded-tl-[24px] bg-background" />
      </span>
      <div className={barClassName}>{children}</div>
    </div>
  );
}

function Actions({ end }: { end?: ReactNode }) {
  return (
    <>
      <ThemeToggle />
      <span className="h-4 w-px bg-white/40 dark:bg-black/40" />
      {end ?? (
        <>
          <Link href="/templates" className="hidden text-xs sm:inline">
            View templates
          </Link>
          <Link
            href="/auth"
            className="rounded-lg bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600 px-2.5 py-1.5 text-xs text-white shadow-[inset_0_1px_0_0_#bae6fd]"
          >
            Get started →
          </Link>
        </>
      )}
    </>
  );
}

export function Header({ end }: { end?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-40 flex w-full justify-center"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:hidden">
        <HeaderShell barClassName="relative flex w-72 items-center justify-between rounded-b-2xl bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black">
          <Brand />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-8 items-center justify-center"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          {open ? (
            <div className="absolute top-full right-0 z-50 mt-2 flex w-48 flex-col gap-3 rounded-xl bg-black p-3 text-white dark:bg-white dark:text-black">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50 dark:text-black/50">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              {end ?? (
                <>
                  <Link
                    href="/templates"
                    className="text-xs"
                    onClick={() => setOpen(false)}
                  >
                    View templates
                  </Link>
                  <Link
                    href="/auth"
                    className="rounded-lg bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600 px-2.5 py-1.5 text-center text-xs text-white shadow-[inset_0_1px_0_0_#bae6fd]"
                    onClick={() => setOpen(false)}
                  >
                    Get started →
                  </Link>
                </>
              )}
            </div>
          ) : null}
        </HeaderShell>
      </div>

      <div className="hidden w-full max-w-2xl sm:block">
        <HeaderShell barClassName="relative flex w-full items-center justify-between rounded-b-2xl bg-black px-4 py-2.5 text-sm text-white dark:bg-white dark:text-black">
          <Brand />
          <div className="flex items-center gap-4 font-medium">
            <Actions end={end} />
          </div>
        </HeaderShell>
      </div>
    </motion.header>
  );
}
