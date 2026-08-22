"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { playClickSoft } from "@/lib/click-soft";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  if (copied) {
    return (
      <span
        className="ml-1.5 inline-flex size-4 items-center justify-center text-neutral-500 dark:text-neutral-400"
        aria-label="Copied"
      >
        <Check className="size-3.5" />
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label="Copy email"
      className="ml-1.5 inline-flex size-4 items-center justify-center text-neutral-500 dark:text-neutral-400"
      onClick={() => {
        playClickSoft();
        void navigator.clipboard.writeText(email).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        });
      }}
    >
      <Copy className="size-3.5" />
    </button>
  );
}
