"use client";

import { Space_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { designSystem } from "@/components/templates/interactive/design-system";
import { samplePortfolio } from "@/components/templates/interactive/data";
import { CopyEmailButton } from "@/components/templates/minimal/copy-email-button";
import { SoftClickLink } from "@/components/templates/minimal/soft-click-link";
import { ThemeToggle } from "@/components/templates/minimal/theme-toggle";
import type { Portfolio } from "@/types/portfolio";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export default function InteractivePage({
  data = samplePortfolio,
}: {
  data?: Portfolio;
}) {
  const socialItems = [
    data.socialLinks.email
      ? { href: `mailto:${data.socialLinks.email}`, label: data.socialLinks.email }
      : null,
    data.socialLinks.github
      ? { href: data.socialLinks.github, label: "GitHub" }
      : null,
    data.socialLinks.linkedin
      ? { href: data.socialLinks.linkedin, label: "LinkedIn" }
      : null,
    data.socialLinks.twitter
      ? { href: data.socialLinks.twitter, label: "Twitter" }
      : null,
    data.socialLinks.website
      ? { href: data.socialLinks.website, label: "Website" }
      : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <div>
      
    </div>
  )
}
