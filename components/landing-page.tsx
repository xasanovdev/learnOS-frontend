import { LandingHeader } from "@/components/landing-header";
import { FocusSection } from "@/components/landing/sections/focus-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { LandingFooter } from "@/components/landing/sections/landing-footer";
import { ToolsSection } from "@/components/landing/sections/tools-section";
import { WorkflowSection } from "@/components/landing/sections/workflow-section";

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
