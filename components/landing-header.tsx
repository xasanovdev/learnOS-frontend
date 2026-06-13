"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Layers3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Workflow", href: "#workflow" },
  { label: "Guidance", href: "#guidance" },

  { label: "Track", href: "#track" },
];

export function LandingHeader() {
  const [isFloating, setIsFloating] = useState(false);
  const [entryDirection, setEntryDirection] = useState<"left" | "right">(
    "right",
  );

  useEffect(() => {
    let previousY = window.scrollY;

    const updateHeader = () => {
      const currentY = window.scrollY;
      const shouldFloat = currentY > 96;

      if (shouldFloat !== isFloating) {
        setEntryDirection(currentY >= previousY ? "right" : "left");
      }

      setIsFloating(shouldFloat);
      previousY = currentY;
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, [isFloating]);

  return (
    <>
      <header className="relative z-20 flex w-full items-center justify-between gap-4">
        <HeaderContent />
      </header>

      <div
        aria-hidden={!isFloating}
        className={cn(
          "fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-4xl items-center justify-between gap-4 rounded-full border border-[#191713]/12 bg-[#f7f4ec]/88 px-3 py-2 shadow-2xl shadow-[#191713]/12 backdrop-blur-xl transition-[opacity,transform] duration-500 ease-out",
          isFloating ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{
          transform: isFloating
            ? "translateX(-50%) translateY(0)"
            : `translateX(calc(-50% ${
                entryDirection === "right" ? "+ 96px" : "- 96px"
              })) translateY(-10px)`,
          visibility: isFloating ? "visible" : "hidden",
        }}
      >
        <HeaderContent floating />
      </div>
    </>
  );
}

function HeaderContent({ floating = false }: { floating?: boolean }) {
  return (
    <>
      <Link href="/" className="flex items-center gap-3">
        <span
          className={cn(
            "flex items-center justify-center bg-[#191713] text-[#f7f4ec] transition-all duration-300",
            floating ? "size-9 rounded-full" : "size-10 rounded-md",
          )}
        >
          <Layers3 className="size-5" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold tracking-normal">learnOS</span>
      </Link>

      <nav className="hidden items-center gap-1 text-sm font-medium text-[#191713]/70 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 transition-colors hover:bg-[#191713]/6 hover:text-[#191713]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Button
        asChild
        variant={floating ? "default" : "outline"}
        className={cn(
          "h-10 px-5 transition-all",
          floating
            ? "rounded-full bg-[#191713] text-[#f7f4ec] hover:bg-[#2a261f]"
            : "rounded-md border-[#191713]/20 bg-[#f7f4ec]/80",
        )}
      >
        <Link href="/auth">Sign in</Link>
      </Button>
    </>
  );
}
