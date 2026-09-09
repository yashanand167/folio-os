import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Folio OS",
  description: "Build your portfolio without the setup.",
};

export default function HomeLayout({
  children,
}: LayoutProps<"/home">) {
  return children;
}
