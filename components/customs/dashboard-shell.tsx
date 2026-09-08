"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, FolderOpen, LogOut } from "lucide-react";

import { CornerStrokes } from "@/components/corner-strokes";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOut } from "@/lib/auth-client";
import { usePortfolioStore } from "@/stores/portfolio.store";

type Panel = "portfolios" | "draft";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "FO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function DashboardShell({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>("portfolios");
  const hasDraft = usePortfolioStore((state) => state.hasDraft());

  async function onSignOut() {
    await signOut();
    router.push("/home");
    router.refresh();
  }

  return (
    <div className="flex min-h-full flex-col px-4 py-5 sm:px-6 sm:py-6">
      <header className="flex items-center justify-between">
        <Link
          href="/home"
          className="text-lg font-medium tracking-tight text-black dark:text-white"
        >
          Folio.OS
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
      </header>

      <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 md:flex-row">
        <aside className="flex w-full shrink-0 flex-col md:w-56">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-black text-xs font-medium text-white dark:bg-white dark:text-black">
              {initials(name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-md font-medium text-black dark:text-white">
                {name || "Account"}
              </p>
              <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                {email}
              </p>
            </div>
          </div>

          <nav className="mt-8 flex flex-1 flex-col">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setPanel("portfolios")}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm ${
                  panel === "portfolios"
                    ? "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-600 hover:bg-neutral-200/70 dark:text-neutral-400 dark:hover:bg-neutral-800/70"
                }`}
              >
                <FolderOpen className="size-4" />
                Portfolios
              </button>
              <button
                type="button"
                onClick={() => setPanel("draft")}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm ${
                  panel === "draft"
                    ? "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-600 hover:bg-neutral-200/70 dark:text-neutral-400 dark:hover:bg-neutral-800/70"
                }`}
              >
                <FileText className="size-4" />
                Draft
              </button>
            </div>

            <div className="mt-auto border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <button
                type="button"
                aria-label="Sign out"
                onClick={() => void onSignOut()}
                className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </nav>
        </aside>

        <section className="min-w-0 flex-1 rounded-2xl bg-white p-6 sm:p-8 dark:bg-neutral-900">
          {panel === "portfolios" ? (
            <>
              <h1 className="text-2xl tracking-tight text-black sm:text-3xl dark:text-white">
                Portfolios
              </h1>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Your published work lives here.
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
            </>
          ) : (
            <>
              <h1 className="text-2xl tracking-tight text-black sm:text-3xl dark:text-white">
                Draft
              </h1>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Pick up where you left off.
              </p>
              <div className="relative mt-10 flex min-h-64 flex-col items-center justify-center px-6 py-16 text-center">
                <CornerStrokes className="border-black dark:border-white" />
                {hasDraft ? (
                  <>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      You have a draft in progress.
                    </p>
                    <Link
                      href="/form"
                      className="mt-4 bg-black px-3 py-1.5 text-sm text-white dark:bg-white dark:text-black"
                    >
                      Continue draft
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      No draft yet.
                    </p>
                    <Link
                      href="/templates"
                      className="mt-4 bg-black px-3 py-1.5 text-sm text-white dark:bg-white dark:text-black"
                    >
                      View templates
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
