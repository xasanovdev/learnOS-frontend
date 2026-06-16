import { ShimmerBlock } from "@/components/shared/shimmer";
import { DashboardVideoAsideSkeleton } from "@/features/workspace/components/skeletons/dashboard-video-aside-skeleton";

export function DashboardVideoSkeleton() {
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">
        <ShimmerBlock className="h-10 w-36 border border-[#0d0d0c]/10 bg-white" />
        <ShimmerBlock className="h-10 w-32 border border-[#0d0d0c]/10 bg-white" />
        <ShimmerBlock className="h-10 w-28 border border-[#0d0d0c]/10 bg-white" />
      </div>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#0d0d0c] md:p-6">
          <ShimmerBlock className="h-4 w-24" />
          <ShimmerBlock className="mt-5 h-10 max-w-2xl" />
          <ShimmerBlock className="mt-4 h-5 max-w-lg" />
        </div>
        <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
          <ShimmerBlock className="h-4 w-20" />
          <ShimmerBlock className="mt-5 h-10 w-full" />
          <ShimmerBlock className="mt-3 h-10 w-full" />
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
          <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
            <ShimmerBlock className="h-8 w-48" />
          </div>
          <div className="p-5 sm:p-6">
            <div className="border border-[#0d0d0c] bg-[#0d0d0c] shadow-[6px_6px_0_#f4ded0]">
              <ShimmerBlock className="aspect-video bg-[#1d1d1b]" />
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <DashboardVideoAsideSkeleton titleWidth="w-28" rows={3} />
          <DashboardVideoAsideSkeleton titleWidth="w-32" rows={3} />
          <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
            <ShimmerBlock className="h-4 w-20" />
            <div className="mt-5 grid gap-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="border border-[#0d0d0c]/12 bg-white p-3"
                >
                  <ShimmerBlock className="h-4 w-full" />
                  <ShimmerBlock className="mt-3 h-3 w-32" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
