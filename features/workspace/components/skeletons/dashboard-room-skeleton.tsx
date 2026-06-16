import { ShimmerBlock } from "@/components/shared/shimmer";
import { DashboardPlaylistCardSkeleton } from "@/features/workspace/components/skeletons/dashboard-playlist-card-skeleton";

export function DashboardRoomSkeleton() {
  return (
    <>
      <div className="mb-4">
        <ShimmerBlock className="h-10 w-36 border border-[#0d0d0c]/10 bg-white" />
      </div>

      <section className="overflow-hidden border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
        <ShimmerBlock className="h-40 border-b border-[#0d0d0c] bg-[#0d0d0c]/10 sm:h-48" />
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <ShimmerBlock className="size-24 border border-[#0d0d0c] bg-white sm:size-28" />
            <div className="flex gap-2">
              <ShimmerBlock className="size-10" />
              <ShimmerBlock className="size-10" />
            </div>
          </div>
          <ShimmerBlock className="mt-6 h-9 max-w-lg" />
          <ShimmerBlock className="mt-3 h-5 w-44" />
          <ShimmerBlock className="mt-6 h-4 max-w-2xl" />
          <ShimmerBlock className="mt-3 h-4 max-w-md" />
          <div className="mt-6 flex gap-5">
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-4 w-32" />
          </div>
          <div className="mt-6 flex gap-6 border-t border-[#0d0d0c]/12 pt-5">
            <ShimmerBlock className="h-4 w-20" />
            <ShimmerBlock className="h-4 w-20" />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
          <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
            <ShimmerBlock className="h-8 w-40" />
            <ShimmerBlock className="mt-4 h-4 w-96 max-w-full" />
          </div>
          <div className="grid gap-4 p-5 sm:p-6">
            {[0, 1].map((item) => (
              <DashboardPlaylistCardSkeleton key={item} />
            ))}
          </div>
        </div>

        <aside className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
          <ShimmerBlock className="h-4 w-32" />
          <ShimmerBlock className="mt-6 h-4 w-24" />
          <ShimmerBlock className="mt-3 h-11 w-full" />
          <ShimmerBlock className="mt-4 h-4 w-full" />
          <ShimmerBlock className="mt-2 h-4 w-2/3" />
          <ShimmerBlock className="mt-5 h-10 w-full" />
        </aside>
      </section>
    </>
  );
}
