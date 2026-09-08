import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { LandingPage } from "@/components/customs/landing-page";
import { auth } from "@/lib/auth";

export default async function RootPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
