import type { Metadata } from "next";

import { AuthPage } from "@/components/customs/auth-page";

export const metadata: Metadata = {
  title: "Get started · Folio OS",
  description: "Create an account or sign in to Folio OS.",
};

export default function AuthRoute() {
  return <AuthPage />;
}
