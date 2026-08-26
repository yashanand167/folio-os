import HeroSection from "@/components/customs/hero-section";
import { Header } from "@/components/header";
import ProcessSection from "@/components/customs/process-section";

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="bg-diagonal-grid pointer-events-none absolute inset-0 bg-white dark:bg-neutral-950" />
      <main className="relative mx-auto h-full w-full overflow-y-auto overscroll-none bg-white [scrollbar-width:none] sm:max-w-6xl sm:border-x dark:bg-neutral-950 [&::-webkit-scrollbar]:hidden">
        <Header />
        <HeroSection />
        <ProcessSection />
      </main>
    </div>
  );
}
