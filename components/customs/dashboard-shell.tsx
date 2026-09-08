"use client";

import Link from "next/link";
import Image from "next/image";

import { CornerStrokes } from "@/components/corner-strokes";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardShell({
  name,
}: {
  name: string;
  email: string;
}) {
  return (
    <main className="px-6 pt-8 pb-24 sm:px-10">
      <div className="flex items-center justify-between">
        <Link
          href="/home"
          className="flex items-center gap-2 font-medium tracking-tight text-blue-400"
        >
          <Image src="/FolioOS.png" alt="Folio OS" width={32} height={32} />
          Folio OS
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white"
          >
            Delete account
          </button>
        </div>
      </div>

      <h1 className="mt-10 text-2xl tracking-tight text-black sm:text-3xl dark:text-white">
        Welcome{name ? `, ${name}` : ""}
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        Your portfolios will live here.
      </p>

      <div className="relative mt-10 flex min-h-64 flex-col items-center justify-center px-6 py-16 text-center">
        <CornerStrokes className="border-black dark:border-white" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No portfolios yet.
        </p>
        <Link
          href="/templates"
          className="mt-4 bg-black px-3 py-1.5 text-sm text-white dark:bg-white dark:text-black"
        >
          View templates
        </Link>
      </div>
    </main>
  );
}
