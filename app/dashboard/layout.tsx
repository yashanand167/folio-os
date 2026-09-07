import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · Folio OS",
  description: "Manage your portfolios.",
};

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-white dark:bg-black">
      <div className="relative mx-auto h-full w-full overflow-y-auto overscroll-none [scrollbar-width:none] sm:max-w-6xl [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
