import { ShimmerBlock } from "@/components/shared/shimmer";
import { DashboardRoomCardSkeleton } from "@/features/workspace/components/skeletons/dashboard-room-card-skeleton";

export function DashboardRoomsSkeleton() {
  return (
    <>
      <section className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#0d0d0c] md:p-6">
        <ShimmerBlock className="h-4 w-20" />
        <ShimmerBlock className="mt-5 h-10 max-w-xl" />
        <ShimmerBlock className="mt-4 h-5 max-w-2xl" />
        <ShimmerBlock className="mt-3 h-5 max-w-lg" />
      </section>

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

      <section className="mt-6 border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
        <div className="flex flex-col gap-4 border-b border-[#0d0d0c]/12 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <ShimmerBlock className="h-8 w-40" />
            <ShimmerBlock className="mt-4 h-4 w-72 max-w-full" />
          </div>
          <ShimmerBlock className="h-11 w-32" />
        </div>
        <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <DashboardRoomCardSkeleton key={item} />
          ))}
        </div>
      </section>
    </>
  );
}
