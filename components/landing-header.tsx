"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layers3 } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Workflow", href: "#workflow" },
  { label: "Track", href: "#track" },
];

export function LandingHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsCompact(window.scrollY > 80);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 animate-[learnos-header-in_0.55s_cubic-bezier(0.22,1,0.36,1)_both] px-4">
      <div
        className={cn(
          "mx-auto rounded-full border border-[#191713]/10 bg-[#f7f4ec]/82 px-3 py-2.5 shadow-2xl shadow-[#191713]/10 backdrop-blur-xl transition-[max-width,padding] duration-500 ease-out sm:px-4",
          isCompact ? "max-w-3xl" : "max-w-5xl",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#191713] text-[#f7f4ec] shadow-sm">
              <Layers3 className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-normal text-[#191713] sm:text-base">
              learnOS
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-[#191713]/5 p-1 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[#191713]/62 transition-colors duration-300 hover:bg-[#f7f4ec] hover:text-[#191713]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/auth"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#191713]/62 transition-colors duration-300 hover:text-[#191713] sm:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="inline-flex rounded-full bg-[#191713] px-4 py-2 text-sm font-medium text-[#f7f4ec] shadow-sm transition-colors duration-300 hover:bg-[#2b2720]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
