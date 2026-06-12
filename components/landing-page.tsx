import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <main className="flex min-h-svh items-center bg-background px-6 py-16">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_420px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            LearnOS
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            Learn faster with one focused workspace.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Organize courses, notes, and practice into a simple learning system
            built to keep momentum clear.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Get started
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline">
              View demo
            </Button>
          </div>
        </div>

        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg border bg-muted shadow-sm lg:block">
          <div className="absolute inset-x-0 top-0 flex h-12 items-center gap-2 border-b bg-background px-4">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-400" />
            <span className="size-3 rounded-full bg-emerald-400" />
          </div>
          <div className="grid h-full grid-rows-[auto_1fr] pt-12">
            <div className="grid grid-cols-3 gap-3 border-b bg-card p-4">
              <div className="h-20 rounded-md bg-primary/90" />
              <div className="h-20 rounded-md bg-muted-foreground/20" />
              <div className="h-20 rounded-md bg-muted-foreground/20" />
            </div>
            <div className="space-y-4 bg-background p-5">
              <div className="h-4 w-3/4 rounded-full bg-muted-foreground/20" />
              <div className="h-4 w-1/2 rounded-full bg-muted-foreground/20" />
              <div className="mt-8 grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="h-24 rounded-md bg-muted" />
                <div className="size-24 rounded-md bg-primary/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
