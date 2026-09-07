import { z } from "zod";

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 64;

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters");

export const emailSchema = z.email("Enter a valid email address");

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
  .max(PASSWORD_MAX, `Password must be at most ${PASSWORD_MAX} characters`)
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number")
  .regex(/[^A-Za-z0-9]/, "Password must include a special character");

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export function fieldErrors(error: z.ZodError) {
  const fields: Partial<Record<string, string>> = {};

  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fields[key]) fields[key] = issue.message;
  }

  return fields;
}

export function zodMessages(error: z.ZodError) {
  return [...new Set(error.issues.map((issue) => issue.message))];
}

const apiErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

export function authApiMessage(error: unknown) {
  const parsed = apiErrorSchema.safeParse(error);
  const code = parsed.data?.code ?? "";
  const message = parsed.data?.message ?? "";

  if (
    code === "USER_ALREADY_EXISTS" ||
    /already exists/i.test(message)
  ) {
    return "An account with this email already exists.";
  }

  if (
    code === "INVALID_EMAIL_OR_PASSWORD" ||
    code === "INVALID_PASSWORD" ||
    /invalid email or password/i.test(message) ||
    /incorrect/i.test(message)
  ) {
    return "Incorrect email or password.";
  }

  return message || "Something went wrong.";
}
