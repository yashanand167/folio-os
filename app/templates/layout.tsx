import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates · Folio OS",
  description: "Choose a portfolio template and publish.",
};

export default function TemplatesLayout({
  children,
}: LayoutProps<"/templates">) {
  return children;
}
