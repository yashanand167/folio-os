import Link from "next/link";

import { Button } from "@/components/ui/button";

function HeaderCorners() {
  const stroke =
    "pointer-events-none absolute h-3.5 w-3.5 border-white";

  return (
    <>
      <span className={`${stroke} top-0 left-0 border-t border-l`} />
      <span className={`${stroke} top-0 right-0 border-t border-r`} />
      <span className={`${stroke} bottom-0 left-0 border-b border-l`} />
      <span className={`${stroke} right-0 bottom-0 border-r border-b`} />
    </>
  );
}

export function Header() {
  return (
    <header className="absolute inset-x-3 top-3 z-30 sm:inset-x-4 sm:top-4">
      <div className="relative flex items-center justify-between gap-3 bg-white/50 px-3 py-3 backdrop-blur-xl sm:px-4 sm:py-3.5">
        <HeaderCorners />
        <Link href="/" className="px-1.5 text-sm font-semibold tracking-tight">
          Folio OS
        </Link>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="lg">Get started</Button>
        </div>
      </div>
    </header>
  );
}
