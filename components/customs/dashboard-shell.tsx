"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CornerStrokes } from "@/components/corner-strokes";
import { Header } from "@/components/header";
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
    <>
      <Header
        end={
          <>
            <span className="hidden text-white/60 sm:inline dark:text-black/60">
              {email}
            </span>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg bg-white px-2.5 py-1.5 text-sm text-black dark:bg-black dark:text-white"
            >
              Sign out
            </button>
          </>
        }
      />
      <main className="px-6 pt-10 pb-24 sm:px-10">
        <h1 className="text-2xl tracking-tight text-black sm:text-3xl dark:text-white">
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
    </>
  );
}
