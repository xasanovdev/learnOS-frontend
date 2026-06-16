import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductMock } from "@/features/landing/components/product-mock";

const HERO_STATS = [
  ["1 link", "to start"],
  ["0 feeds", "while studying"],
  ["6 tools", "beside video"],
] as const;

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <HeroEyebrow />

        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-[#0d0d0c] sm:text-7xl">
          Turn any YouTube video into a study room.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#0d0d0c]/70">
          Paste a video once, then watch without distractions while summaries,
          extracted text, quizzes, chat answers, and visual maps stay tied to
          the source.
        </p>

        <YoutubeLinkForm />
        <HeroStats />
      </div>

      <div className="mt-16">
        <ProductMock />
      </div>
    </section>
  );
}

function HeroEyebrow() {
  return (
    <div className="mb-7 inline-flex items-center gap-2 border border-[#0d0d0c]/15 bg-white px-3 py-2 text-sm font-medium shadow-[4px_4px_0_#0d0d0c]">
      <Sparkles className="size-4 text-[#9d6550]" aria-hidden="true" />
      Video learning, stripped down
    </div>
  );
}

function YoutubeLinkForm() {
  return (
    <form
      action="/auth"
      className="mt-9 flex w-full max-w-3xl flex-col gap-3 border border-[#0d0d0c] bg-white p-2 text-left shadow-[8px_8px_0_#0d0d0c] sm:flex-row"
    >
      <label className="sr-only" htmlFor="youtube-url">
        YouTube video link
      </label>
      <input
        id="youtube-url"
        name="url"
        type="url"
        placeholder="https://youtube.com/watch?v=..."
        className="min-h-13 flex-1 bg-transparent px-3 text-base text-[#0d0d0c] outline-none placeholder:text-[#0d0d0c]/38"
      />
      <Button
        type="submit"
        size="lg"
        className="h-13 rounded-md bg-[#0d0d0c] px-5 text-white hover:bg-[#2a2927]"
      >
        Start learning
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}

function HeroStats() {
  return (
    <div className="mt-8 grid w-full max-w-xl grid-cols-3 divide-x divide-[#0d0d0c]/12 border-y border-[#0d0d0c]/12 bg-white/55">
      {HERO_STATS.map(([value, label]) => (
        <div key={value} className="px-3 py-4">
          <div className="text-xl font-semibold">{value}</div>
          <div className="mt-1 text-xs uppercase text-[#0d0d0c]/50">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
