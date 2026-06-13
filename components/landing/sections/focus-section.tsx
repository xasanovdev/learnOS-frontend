import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FocusSection() {
  return (
    <section
      id="focus"
      className="bg-[#0d0d0c] px-5 py-20 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-[#f4ded0]">
            Focus mode
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Watch the video like it is the only thing on the internet.
          </h2>
        </div>
        <div className="border border-white/18 bg-white/[0.06] p-5">
          <p className="text-lg leading-8 text-white/78">
            Hide recommendations and comments. Keep transcript, chat, quiz,
            summary, and mind-map modes attached to the exact moment you are
            studying.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 h-12 rounded-md bg-[#f4ded0] px-5 text-[#0d0d0c] hover:bg-white"
          >
            <Link href="/auth">
              Open workspace
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
