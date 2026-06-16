import { ShimmerBlock } from "@/components/shared/shimmer";

export function RoomsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="border border-[#0d0d0c] bg-[#fffaf5] p-5 shadow-[5px_5px_0_#0d0d0c]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <ShimmerBlock className="size-11 shrink-0 border border-[#0d0d0c]/10 bg-white" />
              <div className="min-w-0">
                <ShimmerBlock className="h-5 w-40" />
                <ShimmerBlock className="mt-2 h-3 w-16" />
              </div>
            </div>
            <div className="flex gap-2">
              <ShimmerBlock className="size-6" />
              <ShimmerBlock className="size-6" />
            </div>
          </div>

          <ShimmerBlock className="mt-6 h-4 w-full" />
          <ShimmerBlock className="mt-3 h-4 w-2/3" />

          <div className="mt-8 flex items-center justify-between gap-4">
            <ShimmerBlock className="h-4 w-40" />
            <ShimmerBlock className="h-11 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
