import Link from "next/link";

import { CornerStrokes } from "@/components/corner-strokes";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="absolute inset-x-3 top-3 z-30 sm:inset-x-4 sm:top-4">
      <div className="relative flex items-center justify-between gap-3 bg-white/50 px-3 py-3 backdrop-blur-xl sm:px-4 sm:py-3.5">
        <CornerStrokes />
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
