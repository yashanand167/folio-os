import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AuthPage } from "@/components/customs/auth-page";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Get started · Folio OS",
  description: "Create an account or sign in to Folio OS.",
};

export default async function AuthRoute() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <AuthPage />;
}
