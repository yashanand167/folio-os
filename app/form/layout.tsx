import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form · Folio OS",
  description: "Fill in your portfolio details.",
};

export default function FormLayout({
  children,
}: LayoutProps<"/form">) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      <div className="relative mx-auto h-full w-full max-w-[90rem] overflow-y-auto overscroll-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
