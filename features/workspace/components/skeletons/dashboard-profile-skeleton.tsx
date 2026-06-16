import { ShimmerBlock } from "@/components/shared/shimmer";

export function DashboardProfileSkeleton() {
  return (
    <>
      <section className="overflow-hidden border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
        <ShimmerBlock className="h-44 border-b border-[#0d0d0c] bg-[#0d0d0c]/10 sm:h-52" />
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <ShimmerBlock className="size-24 border border-[#0d0d0c] bg-white shadow-[5px_5px_0_#f4ded0] sm:size-28" />
            <ShimmerBlock className="h-10 w-28" />
          </div>
          <ShimmerBlock className="mt-6 h-10 max-w-md" />
          <ShimmerBlock className="mt-3 h-5 w-40" />
          <ShimmerBlock className="mt-6 h-4 max-w-2xl" />
          <ShimmerBlock className="mt-3 h-4 max-w-md" />
          <div className="mt-6 flex flex-wrap gap-4">
            <ShimmerBlock className="h-4 w-36" />
            <ShimmerBlock className="h-4 w-20" />
            <ShimmerBlock className="h-4 w-28" />
          </div>
          <div className="mt-6 flex gap-6 border-t border-[#0d0d0c]/12 pt-5">
            <ShimmerBlock className="h-4 w-20" />
            <ShimmerBlock className="h-4 w-20" />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
          <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
            <ShimmerBlock className="h-8 w-48" />
            <ShimmerBlock className="mt-4 h-4 max-w-xl" />
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-[#0d0d0c]/12 bg-white p-4"
              >
                <div className="flex items-center gap-2">
                  <ShimmerBlock className="size-4" />
                  <ShimmerBlock className="h-3 w-20" />
                </div>
                <ShimmerBlock className="mt-5 h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
            <ShimmerBlock className="h-4 w-36" />
            <div className="mt-5 grid gap-3">
              {[0, 1].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 border border-[#0d0d0c]/12 bg-[#fffaf5] p-4"
                >
                  <div className="flex items-center gap-3">
                    <ShimmerBlock className="size-4" />
                    <ShimmerBlock className="h-4 w-20" />
                  </div>
                  <ShimmerBlock className="h-6 w-6" />
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#0d0d0c] bg-[#0d0d0c] p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
            <ShimmerBlock className="h-4 w-24 bg-white/18" />
            <ShimmerBlock className="mt-5 h-4 w-full bg-white/18" />
            <ShimmerBlock className="mt-3 h-4 w-2/3 bg-white/18" />
            <ShimmerBlock className="mt-6 h-10 w-28 bg-white/18" />
          </div>
        </aside>
      </section>
    </>
  );
}
