import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pt-28 pb-24 text-center sm:pt-32">
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
          className="border border-black px-4 py-2.5 text-sm text-black sm:text-base dark:border-white dark:text-white"
        >
          View templates
        </Link>
      </div>
    </section>
  );
}
