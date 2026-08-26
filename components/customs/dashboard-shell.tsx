"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CornerStrokes } from "@/components/corner-strokes";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOut } from "@/lib/auth-client";

export function DashboardShell({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();

  async function onSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <CornerStrokes className="border-black dark:border-white" />
          <Link href="/dashboard" className="text-sm tracking-tight">
            Folio OS
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <ThemeToggle />
            <span className="h-4 w-px bg-black/40 dark:bg-white/40" />
            <span className="hidden text-neutral-500 sm:inline dark:text-neutral-400">
              {email}
            </span>
            <button
              type="button"
              onClick={onSignOut}
              className="bg-black px-3 py-1.5 text-white dark:bg-white dark:text-black"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-2xl tracking-tight sm:text-3xl">
          Welcome{name ? `, ${name}` : ""}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Your portfolios will live here.
        </p>

        <div className="relative mt-10 flex min-h-64 flex-col items-center justify-center border border-black/10 px-6 py-16 text-center dark:border-white/10">
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
    </div>
  );
}
