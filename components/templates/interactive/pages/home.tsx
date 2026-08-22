"use client";

import { Space_Grotesk } from "next/font/google";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, type PointerEvent as ReactPointerEvent } from "react";

import { designSystem } from "@/components/templates/interactive/design-system";
import { samplePortfolio } from "@/components/templates/interactive/data";
import { SoftClickLink } from "@/components/templates/minimal/soft-click-link";
import { ThemeToggle } from "@/components/templates/minimal/theme-toggle";
import { playClickSoft } from "@/lib/click-soft";
import type { Portfolio } from "@/types/portfolio";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const { motion: motionTokens, borderRadius } = designSystem;

function Spotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 22 });
  const springY = useSpring(y, { stiffness: 80, damping: 22 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, oklch(0.86 0.18 125 / 0.18), transparent 42%)`;

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 mix-blend-multiply dark:mix-blend-screen"
      style={{ background }}
    />
  );
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rotateX = useSpring(0, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 18 });

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -10);
    rotateY.set(px * 10);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}

export default function InteractivePage({
  data = samplePortfolio,
}: {
  data?: Portfolio;
}) {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
