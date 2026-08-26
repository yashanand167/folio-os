import Link from "next/link";

import { CornerStrokes } from "@/components/corner-strokes";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pt-32 pb-24 text-center sm:pt-40">
      <h1 className="max-w-xl text-3xl leading-tight tracking-tight text-black sm:text-5xl dark:text-white">
        Build your portfolio
        <br />
        without the setup.
      </h1>
      <p className="mt-4 text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
        Your work deserves more than a PDF.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          className="bg-black px-4 py-2.5 text-sm text-white sm:text-base dark:bg-white dark:text-black"
        >
          Get started →
        </button>
        <Link
          href="/templates"
          className="relative bg-neutral-100/50 px-4 py-2.5 text-sm text-black sm:text-base dark:bg-neutral-800/50 dark:text-white"
        >
          <CornerStrokes className="border-black dark:border-white" />
          View templates
        </Link>
      </div>
    </section>
  );
}
