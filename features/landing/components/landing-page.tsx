import { LandingHeader } from "./landing-header";
import { FocusSection } from "@/features/landing/components/sections/focus-section";
import { HeroSection } from "@/features/landing/components/sections/hero-section";
import { LandingFooter } from "@/features/landing/components/sections/landing-footer";
import { ToolsSection } from "@/features/landing/components/sections/tools-section";
import { WorkflowSection } from "@/features/landing/components/sections/workflow-section";

export function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#fffdf9] text-[#0d0d0c]">
      <LandingBackground />
      <LandingHeader />
      <HeroSection />
      <WorkflowSection />
      <ToolsSection />
      <FocusSection />
      <LandingFooter />
    </main>
  );
}

function LandingBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 -z-10 h-[820px] bg-[linear-gradient(180deg,#f4ded0_0%,#fffdf9_52%,#fffdf9_100%)]"
    />
  );
}
