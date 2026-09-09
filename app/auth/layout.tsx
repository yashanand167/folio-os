import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get started · Folio OS",
  description: "Create an account or sign in to Folio OS.",
};

export default function AuthLayout({
  children,
}: LayoutProps<"/auth">) {
  return children;
}
