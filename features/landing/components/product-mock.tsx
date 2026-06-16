import { Captions, CirclePlay, MessageCircle } from "lucide-react";

const PRODUCT_ACTIONS = ["Summary", "Quiz", "Map"] as const;

const TRANSCRIPT_LINES = [
  {
    time: "08:12",
    text: "Attention decides what reaches working memory.",
  },
  {
    time: "09:44",
    text: "Diagrams lower load when they expose relationships.",
  },
] as const;

export function ProductMock() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="absolute -right-3 -top-3 hidden h-full w-full border border-[#0d0d0c] bg-[#f4ded0] lg:block" />
      <div className="relative border border-[#0d0d0c] bg-white p-3 shadow-[12px_12px_0_#0d0d0c]">
        <MockChrome />

        <div className="grid gap-3 pt-3 lg:grid-cols-[1.4fr_0.95fr]">
          <div className="min-w-0">
            <VideoPreview />
            <QuickActions />
          </div>

          <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ChatPreview />
            <TranscriptPreview />
          </aside>
        </div>
      </div>
    </div>
  );
}

function MockChrome() {
  return (
    <div className="flex items-center justify-between border-b border-[#0d0d0c]/12 px-2 pb-3">
      <div className="flex items-center gap-2">
        <span className="size-3 bg-[#0d0d0c]" />
        <span className="size-3 bg-[#f4ded0]" />
        <span className="size-3 border border-[#0d0d0c]" />
      </div>
      <span className="text-xs font-medium text-[#0d0d0c]/48">
        youtube.study/session
      </span>
    </div>
  );
}

function VideoPreview() {
  return (
    <div className="relative aspect-video overflow-hidden bg-[#0d0d0c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(244,222,208,0.26),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_34%)]" />
      <div className="absolute left-5 top-5 border border-white/18 bg-white/10 px-3 py-2 text-xs font-medium text-white/78 backdrop-blur">
        Lecture: Cognitive Load
      </div>
      <button
        className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center border border-white bg-white text-[#0d0d0c]"
        aria-label="Play preview"
      >
        <CirclePlay className="size-8" aria-hidden="true" />
      </button>
      <div className="absolute inset-x-5 bottom-5">
        <div className="mb-3 flex items-center justify-between text-xs text-white/72">
          <span>18:42</span>
          <span>Focus mode on</span>
        </div>
        <div className="h-2 bg-white/18">
          <div className="h-full w-[46%] bg-[#f4ded0]" />
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
      {PRODUCT_ACTIONS.map((item) => (
        <div
          key={item}
          className="border border-[#0d0d0c]/12 bg-[#fffaf5] px-3 py-3 text-sm font-medium"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="border border-[#0d0d0c]/12 bg-[#fffaf5] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold">Ask the video</span>
        <MessageCircle className="size-4 text-[#9d6550]" />
      </div>
      <div className="space-y-3 text-sm">
        <div className="bg-white p-3 text-[#0d0d0c]/70">
          Why does the speaker separate memory and attention?
        </div>
        <div className="bg-[#0d0d0c] p-3 text-white/84">
          Because attention filters what reaches working memory at 08:12.
        </div>
      </div>
    </div>
  );
}

function TranscriptPreview() {
  return (
    <div className="border border-[#0d0d0c]/12 bg-white p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <Captions className="size-4 text-[#9d6550]" />
        Transcript
      </div>
      <div className="space-y-3 text-xs leading-5 text-[#0d0d0c]/62">
        {TRANSCRIPT_LINES.map((line) => (
          <p key={line.time}>
            <span className="font-semibold text-[#0d0d0c]">{line.time}</span>{" "}
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
