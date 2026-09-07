"use client";

import HeroSection from "@/components/customs/hero-section";
import { Header } from "@/components/header";
import ProcessSection from "@/components/customs/process-section";

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <main className="relative mx-auto h-full w-full overflow-y-auto overscroll-none [scrollbar-width:none] sm:max-w-6xl ">
        <Header />
        <HeroSection />

        <div className="relative mx-4 mb-6 overflow-hidden rounded-2xl px-3 py-4 sm:mx-10 sm:mb-10 sm:p-10">
          <img
            src="https://i.pinimg.com/1200x/be/d1/17/bed117c8a4ffcf8885bde97fc89c863e.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover dark:hidden"
          />
          <img
            src="https://i.pinimg.com/1200x/b4/8f/34/b48f349afbe54a0fa26d3a3569cc3ce1.jpg"
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
          />
          <div className="relative z-10">
            <ProcessSection />
          </div>
        </div>
      </main>
    </div>
  );
}
