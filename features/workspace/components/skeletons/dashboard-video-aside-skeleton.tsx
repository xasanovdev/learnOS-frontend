import { ShimmerBlock } from "@/components/shared/shimmer";
import { cn } from "@/lib/utils";

export function DashboardVideoAsideSkeleton({
  titleWidth,
  rows,
}: {
  titleWidth: string;
  rows: number;
}) {
  return (
    <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
      <ShimmerBlock className={cn("h-4", titleWidth)} />
      <div className="mt-5 grid gap-3">
        {Array.from({ length: rows }).map((_, item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-4 border-t border-[#0d0d0c]/10 pt-3 first:border-t-0 first:pt-0"
          >
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-4 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
