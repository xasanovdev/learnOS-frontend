import {
  Captions,
  FileText,
  ListChecks,
  MessageCircle,
  Minimize2,
  Network,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const OUTPUTS: OutputItem[] = [
  { name: "Context chat", icon: MessageCircle },
  { name: "Summary", icon: FileText },
  { name: "Transcript", icon: Captions },
  { name: "Quizzes", icon: ListChecks },
  { name: "Mind map", icon: Network },
  { name: "Focus mode", icon: Minimize2 },
];

type OutputItem = {
  name: string;
  icon: LucideIcon;
};

export function ToolsSection() {
  return (
    <section id="tools" className="bg-[#fffdf9] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase text-[#9d6550]">
            Everything you need
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Useful outputs beside the video, not scattered across tabs.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {OUTPUTS.map((output) => (
            <OutputTile key={output.name} output={output} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputTile({ output }: { output: OutputItem }) {
  const Icon = output.icon;

  return (
    <div className="group flex min-h-32 flex-col justify-between border border-[#0d0d0c]/14 bg-white p-4 transition-colors hover:bg-[#f4ded0]">
      <Icon className="size-5 text-[#9d6550] group-hover:text-[#0d0d0c]" />
      <span className="text-lg font-semibold tracking-normal">
        {output.name}
      </span>
    </div>
  );
}
