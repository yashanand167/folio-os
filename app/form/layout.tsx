import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form · Folio OS",
  description: "Fill in your portfolio details.",
};

export default function FormLayout({
  children,
}: LayoutProps<"/form">) {
  return children;
}
