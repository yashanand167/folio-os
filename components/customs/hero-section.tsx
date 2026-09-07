import Link from "next/link";
import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center px-4 pt-8 pb-6 text-center sm:px-6 sm:pt-18 sm:pb-12">
      <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-neutral-800 to-black px-3.5 py-1.5 text-xs text-white ring-1 ring-inset ring-white/15 sm:mb-4">
        <Star className="size-3 fill-yellow-400 text-yellow-400" />
        Star on Github
      </p>
      <h1 className="max-w-xl text-3xl leading-tight tracking-tight text-black sm:text-6xl dark:text-white font-semibold">
        Build your portfolio
        <br />
        <span className="font-serif font-normal italic text-blue-500">
          without the setup.
        </span>
      </h1>

      <p className="mt-3 text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
        Choose a template, drop in your work,
        <br />
        and ship a portfolio that looks
        like you designed it from scratch.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:mt-5 sm:gap-3">
        <Link
          href="/auth"
          className="rounded-lg bg-black px-4 py-2.5 text-sm text-white sm:text-base dark:bg-white dark:text-black"
        >
          Get started →
        </Link>

        <Link
          href="/templates"
          className="rounded-lg bg-neutral-100 px-4 py-2.5 text-sm text-black sm:text-base dark:bg-neutral-800 dark:text-white"
        >
          View templates
        </Link>
      </div>
    </section>
  );
}
