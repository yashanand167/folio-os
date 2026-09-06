"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { AuthDialog } from "@/components/customs/auth-dialog";
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
          <AuthDialog triggerClassName="rounded-lg bg-white px-2.5 py-1.5 text-xs text-black dark:bg-black dark:text-white">
            Get started →
          </AuthDialog>
        </>
      )}
    </>
  );
}

export function Header({ end }: { end?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex justify-center px-3">
      <div className="relative flex w-72 items-center justify-between rounded-b-2xl bg-black px-3 py-2 text-sm text-white sm:hidden dark:bg-white dark:text-black">
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
                <Link href="/templates" className="text-xs" onClick={() => setOpen(false)}>
                  View templates
                </Link>
                <AuthDialog triggerClassName="rounded-lg bg-white px-2.5 py-1.5 text-center text-xs text-black dark:bg-black dark:text-white">
                  Get started →
                </AuthDialog>
              </>
            )}
          </div>
        ) : null}
      </div>

      <div className="mx-auto hidden w-full max-w-xl items-center justify-between rounded-b-2xl bg-black px-3 py-2.5 text-sm text-white sm:flex sm:px-4 dark:bg-white dark:text-black">
        <Brand />
        <div className="flex items-center gap-3 font-medium sm:gap-3.5">
          <Actions end={end} />
        </div>
      </div>
    </header>
  );
}
