"use client";

import { useState } from "react";

import { CornerStrokes } from "@/components/corner-strokes";

type Message = {
  role: "user" | "agent";
  text: string;
};

const initialMessages: Message[] = [
  { role: "user", text: "Build my portfolio." },
  {
    role: "agent",
    text: "Share your name, role, and a few projects. I'll draft it as we go.",
  },
];

export default function ProcessSection() {
  const [messages, setMessages] = useState(initialMessages);
  const [value, setValue] = useState("");

  function send() {
    const text = value.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      {
        role: "agent",
        text: "Got it. I'll keep that in your draft.",
      },
    ]);
    setValue("");
  }

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="relative mx-auto flex aspect-[6/5] w-full flex-col bg-neutral-100/50 p-5 dark:bg-neutral-800/50">
        <CornerStrokes className="border-black dark:border-white" />
        <div className="relative flex min-h-0 flex-1 overflow-hidden bg-white dark:bg-neutral-900">
          <aside className="flex w-52 shrink-0 flex-col border-r border-black/10 sm:w-64 dark:border-white/10">
            <div className="border-b border-black/10 px-3 py-2.5 text-xs tracking-wide text-neutral-500 dark:border-white/10 dark:text-neutral-400">
              Agent
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
              {messages.map((message, index) => (
                <p
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "text-right text-xs text-black sm:text-sm dark:text-white"
                      : "text-xs text-neutral-500 sm:text-sm dark:text-neutral-400"
                  }
                >
                  {message.text}
                </p>
              ))}
            </div>
            <form
              className="border-t border-black/10 p-2 dark:border-white/10"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Message the agent"
                className="w-full bg-transparent px-1 py-1.5 text-xs text-black outline-none placeholder:text-neutral-400 sm:text-sm dark:text-white"
              />
            </form>
          </aside>
          <div className="min-w-0 flex-1 px-5 py-4">
            <h1 className="text-sm tracking-tight text-black sm:text-base dark:text-white">
              Just few simple steps
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
