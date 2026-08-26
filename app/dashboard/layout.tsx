import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · Folio OS",
  description: "Manage your portfolios.",
};

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="bg-diagonal-grid pointer-events-none absolute inset-0 bg-white dark:bg-neutral-950" />
      <div className="relative mx-auto h-full w-full overflow-y-auto overscroll-none bg-white [scrollbar-width:none] sm:max-w-6xl sm:border-x dark:bg-neutral-950 [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
