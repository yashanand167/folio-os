import Link from "next/link";

import { AuthDialog } from "@/components/customs/auth-dialog";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center px-4 pt-8 pb-10 text-center sm:px-6 sm:pt-20 sm:pb-24">
      <h1 className="max-w-xl text-3xl leading-tight tracking-tight text-black sm:text-6xl dark:text-white">
        Build your portfolio
        <br />
        without the setup.
      </h1>

      <p className="mt-4 text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
        Turn your work into a portfolio worth remembering.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
        <AuthDialog triggerClassName="rounded-lg bg-black px-4 py-2.5 text-sm text-white sm:text-base dark:bg-white dark:text-black">
          Get started →
        </AuthDialog>

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
