import Link from "next/link";

import { BrandLogo } from "@/components/shared/brand-logo";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d0c] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BrandLogo variant="white" className="w-36" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/58">
            A focused learning workspace for turning YouTube videos into
            transcripts, quizzes, summaries, chats, and maps.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-white/58">
          <a href="#workflow" className="transition-colors hover:text-white">
            Workflow
          </a>
          <a href="#tools" className="transition-colors hover:text-white">
            Tools
          </a>
          <a href="#focus" className="transition-colors hover:text-white">
            Focus
          </a>
          <Link href="/auth" className="transition-colors hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
