import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Templates · Folio OS",
  description: "Choose a portfolio template and publish.",
};

export default function TemplatesLayout({
  children,
}: LayoutProps<"/templates">) {
  return <div className={inter.className}>{children}</div>;
}
