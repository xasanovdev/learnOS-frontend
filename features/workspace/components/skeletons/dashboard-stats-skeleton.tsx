import { ShimmerBlock } from "@/components/shared/shimmer";

export function DashboardStatsSkeleton() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="border border-[#0d0d0c] bg-white p-4 shadow-[4px_4px_0_#f4ded0]"
        >
          <ShimmerBlock className="h-3 w-20" />
          <ShimmerBlock className="mt-5 h-9 w-10" />
          <ShimmerBlock className="mt-3 h-3 w-36" />
        </div>
      ))}
    </section>
  );
}
