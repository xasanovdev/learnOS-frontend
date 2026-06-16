import { Brain, CirclePlay, ScanText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    label: "01",
    title: "Paste a YouTube link",
    copy: "Start with a lecture, podcast, tutorial, or course video.",
    icon: CirclePlay,
  },
  {
    label: "02",
    title: "We extract the source",
    copy: "Transcript, timestamps, sections, and key ideas stay linked to the video.",
    icon: ScanText,
  },
  {
    label: "03",
    title: "Study inside one room",
    copy: "Chat, summaries, quizzes, and maps appear around the same source.",
    icon: Brain,
  },
];

type WorkflowStep = {
  label: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-y border-[#0d0d0c]/10 bg-white px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <p className="text-sm font-semibold uppercase text-[#9d6550]">
            How it works
          </p>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
            One link becomes a focused learning workspace.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {WORKFLOW_STEPS.map((item) => (
            <WorkflowCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowCard({ item }: { item: WorkflowStep }) {
  const Icon = item.icon;

  return (
    <article className="border border-[#0d0d0c] bg-[#fffdf9] p-5 shadow-[5px_5px_0_#0d0d0c]">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-sm font-semibold uppercase text-[#9d6550]">
          {item.label}
        </span>
        <span className="grid size-10 place-items-center border border-[#0d0d0c]/16 bg-[#f4ded0]">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-normal">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#0d0d0c]/64">{item.copy}</p>
    </article>
  );
}
