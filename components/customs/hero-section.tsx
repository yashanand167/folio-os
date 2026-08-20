import Link from "next/link";

import { CornerStrokes } from "@/components/corner-strokes";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src="https://i.pinimg.com/1200x/80/3c/c2/803cc24726e912cfdcf79e9b80a60ff0.jpg"
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
        <div className="relative w-fit max-w-2xl">
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-5 bg-gradient-to-t from-white via-white/75 to-transparent backdrop-blur-md sm:-inset-x-8 sm:-inset-y-6"
            style={{
              maskImage:
                "radial-gradient(ellipse 90% 85% at 20% 55%, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 85% at 20% 55%, black 40%, transparent 75%)",
            }}
          />
          <h1 className="relative z-10 text-xl leading-tight font-medium tracking-tight sm:text-3xl md:text-4xl">
            Introducing Folio OS
          </h1>
          <p className="relative z-10 mt-2 text-sm text-neutral-700 sm:mt-2 sm:text-lg">
            Folio OS helps you create your own portfolio website in minutes.
            <br /> Choose a template, add your content, customize and <br />
            publish it with no hassle.
          </p>
        </div>
        <div className="relative z-10 mt-5 flex gap-2">
          <button className="bg-black px-4 py-2 text-white">Get Started</button>
          <Link
            href="/templates"
            className="relative bg-white px-4 py-2 text-black"
          >
            <CornerStrokes className="border-neutral-300" />
            View Templates
          </Link>
        </div>
      </div>
    </section>
  );
}
