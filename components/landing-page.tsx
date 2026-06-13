import Link from "next/link";
import {
  ArrowRight,
  Binary,
  BookOpenCheck,
  Code2,
  Compass,
  Cuboid,
  Play,
  Sparkles,
} from "lucide-react";

import { HeroAlgorithmScene } from "@/components/hero-algorithm-scene";
import { LandingHeader } from "@/components/landing-header";
import { Button } from "@/components/ui/button";

const problemTracks = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Dynamic Programming",
  "Graphs",
];

const features = [
  {
    icon: BookOpenCheck,
    title: "Solve with focus",
    description:
      "A workspace built around the Blind 150 path, not a noisy problem archive.",
  },
  {
    icon: Compass,
    title: "Guidance when stuck",
    description:
      "Move from small hints to solution shape only when you need the next step.",
  },
  {
    icon: Cuboid,
    title: "Visual mental models",
    description:
      "Use diagrams and future 3D views to make recursion, graphs, and windows easier to reason about.",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#f7f4ec] text-[#191713]">
      <section className="relative border-b border-[#191713]/10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,23,19,.06)_1px,transparent_1px),linear-gradient(rgba(25,23,19,.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute right-0 top-0 h-80 w-80 bg-[#ff6b35]/20 blur-3xl" />
        <div className="absolute bottom-0 left-8 h-72 w-72 bg-[#1b9aaa]/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[88dvh] w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <LandingHeader />

          <div className="flex flex-1 flex-col items-center pt-28 text-center sm:pt-32 lg:pt-30">
            <div className="max-w-5xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#191713]/15 bg-white/50 px-3 py-1.5 text-sm font-medium text-[#191713]/70">
                <Binary className="size-4 text-[#1b9aaa]" aria-hidden="true" />
                LeetCode 150 workspace
              </div>

              <h1 className="text-5xl font-semibold leading-[0.92] tracking-normal text-balance sm:text-7xl">
                Practice patterns in one focused workspace.
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#4b453b] sm:text-xl">
                Solve the curated 150, check your answer, get progressive hints,
                and build a visual memory of each algorithm when plain text is
                not enough.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-md bg-[#191713] px-5 text-[#f7f4ec] hover:bg-[#2a261f]"
                >
                  <Link href="/dashboard">
                    <Play className="size-4" aria-hidden="true" />
                    Open workspace
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md border-[#191713]/20 bg-transparent px-5"
                >
                  <Link href="/auth">
                    Get access
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <HeroAlgorithmScene />
          </div>
        </div>
      </section>

      <section id="workflow" className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-[#191713]/12 bg-white/55 p-6"
            >
              <feature.icon
                className="mb-6 size-6 text-[#1b9aaa]"
                aria-hidden="true"
              />
              <h2 className="text-xl font-semibold tracking-normal">
                {feature.title}
              </h2>
              <p className="mt-3 leading-7 text-[#5d5549]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="guidance"
        className="border-y border-[#191713]/10 bg-[#191713] px-5 py-16 text-[#f7f4ec] sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-[#f7f4ec] text-[#191713]">
              <Sparkles className="size-6" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
              Ask for less help first.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#d8d0c1]">
              The product direction is simple: keep users solving. Guidance is
              progressive, answers are checkable, and visualizations appear when
              the idea benefits from motion or space.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Nudge", "Pattern", "Solution"].map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-white/10 bg-white/6 p-5"
              >
                <span className="font-mono text-sm text-[#f7c948]">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-[#d8d0c1]">
                  {index === 0 &&
                    "A small observation that keeps the problem yours."}
                  {index === 1 &&
                    "The underlying algorithmic shape and constraints."}
                  {index === 2 &&
                    "A complete explanation after the attempt is done."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="track" className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
                Built around the 150.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#5d5549]">
                Start with a clean curated path. Add richer problem views,
                answer checks, and Three.js explanations as the workspace grows.
              </p>
            </div>
            <Button
              asChild
              className="h-11 w-fit rounded-md bg-[#ff6b35] px-5 text-white hover:bg-[#e85f2d]"
            >
              <Link href="/dashboard">
                <Code2 className="size-4" aria-hidden="true" />
                Start practicing
              </Link>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {problemTracks.map((track) => (
              <span
                key={track}
                className="rounded-full border border-[#191713]/15 bg-white/55 px-4 py-2 text-sm font-medium text-[#3d382f]"
              >
                {track}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
