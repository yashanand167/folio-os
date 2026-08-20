import Link from "next/link";

import { CornerStrokes } from "@/components/corner-strokes";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-auto mx-auto max-w-5xl px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative flex items-center justify-between gap-2 bg-white/60 px-3 py-2 backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3.5">
          <CornerStrokes />
          <Link
            href="/"
            className="text-xs font-semibold tracking-tight sm:text-sm"
          >
            Folio OS
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" className="sm:h-9 sm:px-2.5 sm:text-sm">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
