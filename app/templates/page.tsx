"use client";

import { useState } from "react";

import FloatingBar from "@/components/customs/floating-bar";
import InteractivePage from "@/components/templates/interactive/pages/home";
import MinimalPage from "@/components/templates/minimal/pages/home";

const templates = [
  { id: "minimal", label: "Minimal", Page: MinimalPage },
  { id: "interactive", label: "Interactive", Page: InteractivePage },
] as const;

export default function Templates() {
  const [index, setIndex] = useState(0);
  const current = templates[index];
  const Page = current.Page;

  return (
    <div className="relative min-h-screen">
      <Page key={current.id} />
      <FloatingBar
        label={current.label}
        onPrev={() =>
          setIndex((value) => (value - 1 + templates.length) % templates.length)
        }
        onNext={() => setIndex((value) => (value + 1) % templates.length)}
      />
    </div>
  );
}
