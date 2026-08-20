import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col border-x">
      <Header />
      <section className="relative w-full overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/cb/78/50/cb7850eeed5a29a915ac220b88b34d22.jpg"
          alt="logo"
          className="h-auto w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white from-25% via-white/80 to-transparent backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to top, black 45%, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black 45%, transparent)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 sm:px-8 sm:pb-24">
          <h1 className="text-xl leading-tight font-medium tracking-tight sm:text-3xl md:text-4xl">
            Introducing Folio OS
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:mt-2 sm:text-lg">
            Design it from scratch or use our templates to get started
          </p>
        </div>
      </section>

      <section>

      </section>
    </main>
  );
}
