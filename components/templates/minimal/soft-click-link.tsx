"use client";

import { playClickSoft } from "@/lib/click-soft";

export function SoftClickLink({
  href,
  children,
  className,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => playClickSoft()}
    >
      {children}
    </a>
  );
}
