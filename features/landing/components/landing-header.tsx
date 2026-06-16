"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { cn } from "@/lib/utils";

export function LandingHeader() {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsMinimized((current) => {
        if (current) {
          return window.scrollY > 24;
        }

        return window.scrollY > 64;
      });
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={cn(
        "fixed z-50 w-full transition-all duration-500 ease-out",
        isMinimized ? "top-6 px-5" : "top-0 px-7",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center px-4 py-2 justify-between transition-all duration-500 ease-out",
          isMinimized
            ? "max-w-4xl rounded-[2rem] border border-[#0d0d0c]/10 bg-white/80 shadow-2xl shadow-[#0d0d0c]/12 backdrop-blur-md"
            : "max-w-7xl rounded-[2rem] border border-transparent bg-transparent px-0 py-4 shadow-none backdrop-blur-0",
        )}
      >
        <Link href="/" className="flex items-center">
          <BrandLogo
            priority
            className={cn(
              "transition-all duration-500",
              isMinimized ? "w-28" : "w-36",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 text-base font-medium md:flex">
          <a
            href="#workflow"
            className="text-[#0d0d0c]/78 transition-colors duration-300 hover:text-[#0d0d0c]"
          >
            Workflow
          </a>
          <a
            href="#tools"
            className="text-[#0d0d0c]/78 transition-colors duration-300 hover:text-[#0d0d0c]"
          >
            Tools
          </a>
          <a
            href="#focus"
            className="text-[#0d0d0c]/78 transition-colors duration-300 hover:text-[#0d0d0c]"
          >
            Focus
          </a>
        </nav>

        <Link
          href="/auth"
          className="inline-flex rounded-full bg-[#0d0d0c] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0d0d0c]/18 transition-colors duration-300 hover:bg-[#2a2927]"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
