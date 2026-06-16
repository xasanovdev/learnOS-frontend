import { ShimmerBlock } from "@/components/shared/shimmer";

export function DashboardPlaylistCardSkeleton() {
  return (
    <article className="grid gap-4 border border-[#0d0d0c] bg-[#fffaf5] p-4 shadow-[4px_4px_0_#f4ded0] sm:grid-cols-[180px_minmax(0,1fr)_auto]">
      <ShimmerBlock className="aspect-video border border-[#0d0d0c]/10 bg-[#0d0d0c]/10" />
      <div className="min-w-0 self-center">
        <ShimmerBlock className="h-5 w-full max-w-md" />
        <ShimmerBlock className="mt-3 h-4 w-44" />
        <div className="mt-4 flex flex-wrap gap-3">
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-3 w-28" />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-center">
        <ShimmerBlock className="h-10 w-28" />
        <ShimmerBlock className="size-10" />
        <ShimmerBlock className="size-10" />
      </div>
    </article>
  );
}
