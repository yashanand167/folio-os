"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Folio OS?",
    answer:
      "A quieter way to ship a portfolio. You bring the work, we handle the setup — template, layout, and a live site you can actually send.",
  },
  {
    question: "How does it work?",
    answer:
      "Share your profile or fill a short form. Folio Agent drafts the site from that. You tweak the copy, switch templates if you want, then publish.",
  },
  {
    question: "Do I need to write code?",
    answer:
      "No. Templates are ready to use. If something feels off, tell the agent — it keeps the draft in sync without you opening a repo.",
  },
  {
    question: "Can I change templates later?",
    answer:
      "Yes. Your content stays put. Pick another look and the same work lands in the new layout.",
  },
  {
    question: "Who is this for?",
    answer:
      "Designers, developers, and anyone who needs a portfolio that doesn't look like a leftover template. Built for people who care how the work is seen.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-4 mb-16 sm:mx-10 sm:mb-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl tracking-tight text-black sm:text-4xl dark:text-white">
          Questions,
          <br className="sm:hidden" /> answered.
        </h2>
        <p className="mt-3 text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
          The short version of how Folio OS works.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-black/10 sm:mt-12 dark:border-white/10">
        {faqs.map((faq, index) => {
          const isOpen = open === index;

          return (
            <div
              key={faq.question}
              className={cn(
                "border-black/10 dark:border-white/10",
                index > 0 && "border-t",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 px-4 py-4 text-left sm:gap-5 sm:px-5 sm:py-5"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="mt-0.5 shrink-0 font-mono text-[10px] tracking-wider text-blue-400 sm:text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-sm tracking-tight text-black sm:text-base dark:text-white">
                  {faq.question}
                </span>
                <Plus
                  className={cn(
                    "mt-0.5 size-4 shrink-0 text-neutral-400 transition-transform duration-300 dark:text-neutral-500",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex gap-4 px-4 pb-4 sm:gap-5 sm:px-5 sm:pb-5">
                    <span
                      aria-hidden
                      className="invisible shrink-0 font-mono text-[10px] sm:text-xs"
                    >
                      00
                    </span>
                    <p className="min-w-0 flex-1 pr-8 text-sm leading-relaxed text-neutral-500 sm:pr-10 dark:text-neutral-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
        <p className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
          Still deciding?
        </p>
        <Link
          href="/auth"
          className="rounded-lg bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600 px-4 py-2.5 text-sm text-white shadow-[inset_0_1px_0_0_#bae6fd] sm:text-base"
        >
          Get started →
        </Link>
      </div>
    </section>
  );
}
