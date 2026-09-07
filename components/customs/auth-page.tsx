"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { FaGoogle } from "react-icons/fa";

import { ThemeToggle } from "@/components/theme-toggle";
import { signIn, signUp } from "@/lib/auth-client";
import {
  authApiMessage,
  fieldErrors,
  signInSchema,
  signUpSchema,
  zodMessages,
} from "@/types/auth";

type AuthView = "login" | "signup";

export function AuthPage({ defaultView = "signup" }: { defaultView?: AuthView }) {
  const router = useRouter();
  const [view, setView] = useState<AuthView>(defaultView);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [pending, setPending] = useState(false);
  const hideTimer = useRef<number>(0);

  const isSignup = view === "signup";

  function showErrors(
    nextMessages: string[],
    nextFields: Partial<Record<string, string>> = {},
  ) {
    window.clearTimeout(hideTimer.current);
    setMessages(nextMessages);
    setErrors(nextFields);
    hideTimer.current = window.setTimeout(() => {
      setMessages([]);
      setErrors({});
    }, 4000);
  }

  function clearErrors() {
    window.clearTimeout(hideTimer.current);
    setMessages([]);
    setErrors({});
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearErrors();

    if (isSignup) {
      const parsed = signUpSchema.safeParse({ name, email, password });
      if (!parsed.success) {
        showErrors(zodMessages(parsed.error), fieldErrors(parsed.error));
        return;
      }

      setPending(true);
      const result = await signUp.email(parsed.data);
      setPending(false);

      if (result.error) {
        showErrors([authApiMessage(result.error)]);
        return;
      }
    } else {
      const parsed = signInSchema.safeParse({ email, password });
      if (!parsed.success) {
        showErrors(zodMessages(parsed.error), fieldErrors(parsed.error));
        return;
      }

      setPending(true);
      const result = await signIn.email(parsed.data);
      setPending(false);

      if (result.error) {
        showErrors([authApiMessage(result.error)]);
        return;
      }
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="fixed inset-0 flex bg-white dark:bg-black">
      <div className="relative flex w-full flex-col overflow-y-auto px-6 py-8 sm:px-10 lg:w-[42%] lg:px-14">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium tracking-tight text-blue-400"
          >
            <Image src="/FolioOS.png" alt="Folio OS" width={32} height={32} />
            Folio OS
          </Link>
          <ThemeToggle />
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="text-2xl tracking-tight text-black sm:text-3xl dark:text-white">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {isSignup
              ? "Sign up to start building your portfolio."
              : "Sign in to continue to Folio OS."}
          </p>

          <button
            type="button"
            onClick={() => {
              clearErrors();
              void signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
              });
            }}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-black/15 px-3 py-2.5 text-sm text-black dark:border-white/20 dark:text-white"
          >
            <FaGoogle className="size-3.5" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[11px] tracking-wide text-neutral-400 uppercase">
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            or
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <AnimatePresence>
              {messages.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg border border-red-500/40 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/50 dark:text-red-400"
                >
                  <ul className="flex flex-col gap-1">
                    {messages.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {isSignup ? (
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-neutral-500">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={`rounded-lg border bg-transparent px-3 py-2.5 text-black outline-none dark:text-white ${
                    errors.name
                      ? "border-red-500"
                      : "border-black/15 dark:border-white/20"
                  }`}
                />
              </label>
            ) : null}

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-neutral-500">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`rounded-lg border bg-transparent px-3 py-2.5 text-black outline-none dark:text-white ${
                  errors.email
                    ? "border-red-500"
                    : "border-black/15 dark:border-white/20"
                }`}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-neutral-500">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`rounded-lg border bg-transparent px-3 py-2.5 text-black outline-none dark:text-white ${
                  errors.password
                    ? "border-red-500"
                    : "border-black/15 dark:border-white/20"
                }`}
              />
              {isSignup && !errors.password ? (
                <span className="text-xs text-neutral-400">
                  8–64 characters, with upper, lower, number, and special
                  character.
                </span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 rounded-lg bg-black px-3 py-2.5 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {pending
                ? "Please wait…"
                : isSignup
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            {isSignup ? "Already have an account?" : "New to Folio OS?"}{" "}
            <button
              type="button"
              className="text-black underline underline-offset-2 dark:text-white"
              onClick={() => {
                setView(isSignup ? "login" : "signup");
                clearErrors();
              }}
            >
              {isSignup ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </div>

      <div className="hidden p-4 lg:block lg:w-[58%] lg:p-6">
        <img
          src="/image.png"
          alt=""
          className="h-full w-full rounded-2xl border border-neutral-200 object-cover dark:hidden dark:border-neutral-800"
        />
        <img
          src="/Image2.png"
          alt=""
          className="hidden h-full w-full rounded-2xl border border-neutral-200 object-cover dark:block dark:border-neutral-800"
        />
      </div>
    </div>
  );
}
