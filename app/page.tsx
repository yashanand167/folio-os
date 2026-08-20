import HeroSection from "@/components/customs/hero-section";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="bg-diagonal-grid min-h-screen w-full">
      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col border-x bg-white">
        <Header />
        <HeroSection />

        <section className="flex items-center justify-center">
          <h1 className="text-2xl">Few Simple Steps is all it takes</h1>
        </section>
      </main>
    </div>
  );
}
