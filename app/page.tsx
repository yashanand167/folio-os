import HeroSection from "@/components/customs/hero-section";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="bg-diagonal-grid min-h-screen w-full">
      <main className="relative mx-auto flex min-h-screen w-full flex-col bg-white sm:max-w-5xl sm:border-x">
        <Header />
        <HeroSection />

        <section className="flex items-center justify-center px-4 py-12">
          <h1 className="text-center text-xl sm:text-2xl">
            Few Simple Steps is all it takes
          </h1>
        </section>
      </main>
    </div>
  );
}
