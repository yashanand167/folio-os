"use client";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn, signUp } from "@/lib/auth-client";
import {
  fieldErrors,
  signInSchema,
  signUpSchema,
} from "@/types/auth";

type AuthView = "login" | "signup";

export function AuthDialog({
  children,
  triggerClassName,
  defaultView = "signup",
}: {
  children: React.ReactNode;
  triggerClassName?: string;
  defaultView?: AuthView;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>(defaultView);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [pending, setPending] = useState(false);

  const isSignup = view === "signup";

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setError(null);
    setErrors({});
    setPending(false);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setErrors({});

    if (isSignup) {
      const parsed = signUpSchema.safeParse({ name, email, password });
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error));
        return;
      }

      setPending(true);
      const result = await signUp.email(parsed.data);
      setPending(false);

      if (result.error) {
        setError(result.error.message ?? "Something went wrong.");
        return;
      }
    } else {
      const parsed = signInSchema.safeParse({ email, password });
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error));
        return;
      }

      setPending(true);
      const result = await signIn.email(parsed.data);
      setPending(false);

      if (result.error) {
        setError(result.error.message ?? "Something went wrong.");
        return;
      }
    }

    resetForm();
    setOpen(false);
  }

  async function onGoogle() {
    setError(null);
    await signIn.social({ provider: "google" });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setView(defaultView);
          resetForm();
        }
      }}
    >
      <DialogTrigger className={triggerClassName}>{children}</DialogTrigger>
      <DialogContent className="rounded-none sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>
            {isSignup ? "Create your account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription>
            {isSignup
              ? "Sign up to start building your portfolio."
              : "Sign in to continue to Folio OS."}
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={onGoogle}
          className="flex w-full items-center justify-center gap-2 border border-black/15 px-3 py-2 text-sm text-black dark:border-white/20 dark:text-white"
        >
          <FaGoogle className="size-3.5" />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-[11px] tracking-wide text-neutral-400 uppercase">
          <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          or
          <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          {isSignup ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-neutral-500">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border border-black/15 bg-transparent px-3 py-2 text-black outline-none dark:border-white/20 dark:text-white"
              />
              {errors.name ? (
                <span className="text-xs text-red-600">{errors.name}</span>
              ) : null}
            </label>
          ) : null}

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-neutral-500">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-black/15 bg-transparent px-3 py-2 text-black outline-none dark:border-white/20 dark:text-white"
            />
            {errors.email ? (
              <span className="text-xs text-red-600">{errors.email}</span>
            ) : null}
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-neutral-500">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-black/15 bg-transparent px-3 py-2 text-black outline-none dark:border-white/20 dark:text-white"
            />
            {errors.password ? (
              <span className="text-xs text-red-600">{errors.password}</span>
            ) : isSignup ? (
              <span className="text-xs text-neutral-400">
                8–64 characters, with upper, lower, number, and special
                character.
              </span>
            ) : null}
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-1 bg-black px-3 py-2 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {pending
              ? "Please wait…"
              : isSignup
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-500">
          {isSignup ? "Already have an account?" : "New to Folio OS?"}{" "}
          <button
            type="button"
            className="text-black underline underline-offset-2 dark:text-white"
            onClick={() => {
              setView(isSignup ? "login" : "signup");
              setError(null);
              setErrors({});
            }}
          >
            {isSignup ? "Sign in" : "Create an account"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
