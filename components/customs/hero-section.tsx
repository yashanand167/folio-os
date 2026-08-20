import Link from "next/link";

import { CornerStrokes } from "@/components/corner-strokes";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="relative min-h-[32rem] sm:min-h-0">
        <img
          src="https://i.pinimg.com/1200x/80/3c/c2/803cc24726e912cfdcf79e9b80a60ff0.jpg"
          alt="Folio OS"
          className="absolute inset-0 size-full object-cover sm:static sm:h-auto sm:w-full"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-white from-20% via-white/80 to-transparent backdrop-blur-[2px] sm:h-1/2"
          style={{
            maskImage: "linear-gradient(to top, black 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black 40%, transparent)",
          }}
        />
        <div className="relative z-10 flex min-h-[32rem] flex-col justify-end px-4 pt-16 pb-8 sm:absolute sm:inset-x-0 sm:bottom-0 sm:min-h-0 sm:px-8 sm:pt-0 sm:pb-20">
          <div className="relative w-full max-w-2xl">
            <div
              className="pointer-events-none absolute -inset-x-4 -inset-y-4 bg-gradient-to-t from-white/80 via-white/50 to-transparent backdrop-blur-md sm:-inset-x-8 sm:-inset-y-6"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 85% at 20% 55%, black 40%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 85% at 20% 55%, black 40%, transparent 75%)",
              }}
            />
            <h1 className="relative z-10 text-2xl leading-tight font-medium tracking-tight sm:text-3xl md:text-4xl">
              Introducing Folio OS
            </h1>
            <p className="relative z-10 mt-2 max-w-xl text-sm text-neutral-700 sm:text-lg">
              Folio OS helps you create your own portfolio website in minutes.
              Choose a template, add your content, customize and publish it with
              no hassle.
            </p>
          </div>
          <div className="relative z-10 mt-5 flex w-full gap-2 sm:w-auto">
            <button className="flex-1 bg-black px-4 py-2.5 text-sm text-white sm:flex-none sm:py-2 sm:text-base">
              Get Started
            </button>
            <Link
              href="/templates"
              className="relative flex-1 bg-white px-4 py-2.5 text-center text-sm text-black sm:flex-none sm:py-2 sm:text-base"
            >
              <CornerStrokes className="border-neutral-300" />
              View Templates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
