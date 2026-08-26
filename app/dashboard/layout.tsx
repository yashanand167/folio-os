import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · Folio OS",
  description: "Manage your portfolios.",
};

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return children;
}
