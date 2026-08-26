"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { CornerStrokes } from "@/components/corner-strokes";
import MinimalPage from "@/components/templates/minimal/pages/home";
import { cn } from "@/lib/utils";

type Message =
  | {
      role: "user";
      kind: "data";
      name: string;
      profession: string;
      details: string[];
    }
  | { role: "user"; kind: "text"; text: string }
  | { role: "agent"; text: string };

const initialMessages: Message[] = [
  {
    role: "user",
    kind: "data",
    name: "Alex Rivera",
    profession: "Designer & Developer",
    details: ["github.com/alexrivera", "3 projects", "resume.pdf"],
  },
  {
    role: "agent",
    text: "Received your profile. I'll draft the portfolio from this.",
  },
  {
    role: "agent",
    text: "Your portfolio is ready. Anything you wanna change?",
  },
];

export default function ProcessSection() {
  const [messages, setMessages] = useState(initialMessages);
  const [value, setValue] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  function send() {
    const text = value.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { role: "user", kind: "text", text },
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
        <div className="relative flex min-h-0 flex-1 overflow-hidden bg-white dark:bg-neutral-950">
          {chatOpen ? (
            <button
              type="button"
              aria-label="Close agent"
              className="absolute inset-0 z-10 bg-black/20 lg:hidden"
              onClick={() => setChatOpen(false)}
            />
          ) : null}
          <aside
            className={cn(
              "flex w-64 shrink-0 flex-col bg-white dark:bg-neutral-950",
              chatOpen
                ? "absolute inset-y-0 left-0 z-20 lg:relative"
                : "hidden lg:flex",
            )}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-3 py-2.5 dark:border-white/10">
              <p className="text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
                Folio Agent
              </p>
              <button
                type="button"
                aria-label="Close agent"
                className="inline-flex size-7 items-center justify-center lg:hidden"
                onClick={() => setChatOpen(false)}
              >
                <X className="size-4 text-neutral-500" />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
              {messages.map((message, index) => {
                if (message.role === "agent") {
                  return (
                    <p
                      key={`agent-${index}`}
                      className="mr-auto max-w-[90%] rounded-2xl rounded-bl-md bg-neutral-100 px-2.5 py-1.5 text-xs text-neutral-600 sm:text-sm dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {message.text}
                    </p>
                  );
                }

                if (message.kind === "data") {
                  return (
                    <div
                      key={`data-${index}`}
                      className="ml-auto flex w-max max-w-full flex-col gap-1 rounded-2xl rounded-br-md bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 px-3 py-2.5 text-left text-xs leading-snug text-white sm:text-sm"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="whitespace-nowrap font-medium">
                          {message.name}
                        </p>
                        <span className="shrink-0 text-[10px] leading-none text-white/60">
                          auto-sent
                        </span>
                      </div>
                      <p className="whitespace-nowrap text-white/85">
                        {message.profession}
                      </p>
                      {message.details.map((detail) => (
                        <p key={detail} className="whitespace-nowrap text-white/80">
                          {detail}
                        </p>
                      ))}
                    </div>
                  );
                }

                return (
                  <p
                    key={`user-${index}`}
                    className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 px-2.5 py-1.5 text-right text-xs text-white sm:text-sm"
                  >
                    {message.text}
                  </p>
                );
              })}
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
          <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 overflow-auto">
              <MinimalPage embedded />
            </div>
            {chatOpen ? null : (
              <button
                type="button"
                aria-label="Open agent"
                className="absolute bottom-4 left-4 z-10 inline-flex size-10 items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white lg:hidden"
                onClick={() => setChatOpen(true)}
              >
                <MessageCircle className="size-4" />
              </button>
            )}
            <button
              type="button"
              className="absolute right-4 bottom-4 z-10 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 px-3 py-1.5 text-sm text-white"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
