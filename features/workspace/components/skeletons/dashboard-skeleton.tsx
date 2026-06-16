import { ShimmerBlock } from "@/components/shared/shimmer";
import { DashboardProfileSkeleton } from "@/features/workspace/components/skeletons/dashboard-profile-skeleton";
import { DashboardRoomSkeleton } from "@/features/workspace/components/skeletons/dashboard-room-skeleton";
import { DashboardRoomsSkeleton } from "@/features/workspace/components/skeletons/dashboard-rooms-skeleton";
import { DashboardVideoSkeleton } from "@/features/workspace/components/skeletons/dashboard-video-skeleton";
import type { DashboardLoadingSkeletonKind } from "@/features/workspace/utils/dashboard-utils";

export function DashboardSkeleton({
  kind,
}: {
  kind: DashboardLoadingSkeletonKind;
}) {
  return (
    <main className="min-h-dvh bg-[#fffdf9] text-[#0d0d0c]">
      <div className="flex min-h-dvh">
        <aside className="hidden w-72 shrink-0 border-r border-[#0d0d0c]/10 bg-white px-5 py-6 lg:block">
          <ShimmerBlock className="h-8 w-36" />
          <div className="mt-12 grid gap-6">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ShimmerBlock className="size-4" />
                <ShimmerBlock className="h-4 w-28" />
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[#0d0d0c]/10 bg-[#fffdf9]/88 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-4">
              <ShimmerBlock className="h-8 w-28 lg:hidden" />
              <ShimmerBlock className="hidden h-11 min-w-0 flex-1 md:block" />
              <div className="flex items-center gap-3">
                <div className="hidden grid-cols-1 gap-2 sm:grid">
                  <ShimmerBlock className="h-4 w-32" />
                  <ShimmerBlock className="ml-auto h-3 w-20" />
                </div>
                <ShimmerBlock className="size-10" />
                <ShimmerBlock className="size-10" />
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
            <DashboardSkeletonBody kind={kind} />
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardSkeletonBody({
  kind,
}: {
  kind: DashboardLoadingSkeletonKind;
}) {
  switch (kind) {
    case "profile":
      return <DashboardProfileSkeleton />;
    case "room":
      return <DashboardRoomSkeleton />;
    case "video":
      return <DashboardVideoSkeleton />;
    case "rooms":
      return <DashboardRoomsSkeleton />;
  }
}
