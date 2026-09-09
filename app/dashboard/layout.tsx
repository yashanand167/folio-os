import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · Folio OS",
  description: "Manage your portfolios.",
};

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      <div className="relative mx-auto h-full w-full overflow-y-auto overscroll-none [scrollbar-width:none] max-w-[90rem] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
