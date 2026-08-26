import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/customs/dashboard-shell";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <DashboardShell name={session.user.name} email={session.user.email} />
  );
}
