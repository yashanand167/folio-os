import HeroSection from "@/components/customs/hero-section";
import { Header } from "@/components/header";
import ProcessSection from "@/components/customs/process-section";

export default function Home() {
  return (
    <div className="bg-diagonal-grid min-h-screen w-full bg-white dark:bg-neutral-950">
      <main className="relative mx-auto flex min-h-screen w-full flex-col bg-white sm:max-w-6xl sm:border-x dark:bg-neutral-950">
        <Header />
        <HeroSection />

        <ProcessSection />
      </main>
    </div>
  );
}
