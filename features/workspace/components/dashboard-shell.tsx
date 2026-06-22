"use client";

import { BookOpen, Library, LogOut, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

import { BrandLogo } from "@/components/shared/brand-logo";
import { DashboardNavItem } from "./dashboard-nav-item";
import { WorkspaceHeaderSearch } from "./workspace-header-search";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { DashboardSkeleton } from "@/features/workspace/components/skeletons/dashboard-skeleton";
import {
  getDashboardLoadingSkeletonKind,
  getDisplayName,
  getInitials,
  getUserHandle,
} from "@/features/workspace/utils/dashboard-utils";

export function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: mutateCache } = useSWRConfig();
  const { user, isLoading, isUnauthenticated, error } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    if (!isUnauthenticated) {
      return;
    }

    const query = window.location.search.replace(/^\?/, "");
    const nextPath = query ? `${pathname}?${query}` : pathname;
    router.replace(`/auth?next=${encodeURIComponent(nextPath)}`);
  }, [isUnauthenticated, pathname, router]);

  const displayName = useMemo(() => getDisplayName(user), [user]);

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await logout();
      await mutateCache(() => true, undefined, { revalidate: false });
      router.replace("/auth");
      router.refresh();
    } catch {
      setLogoutError("Could not log out. Try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return (
      <DashboardSkeleton kind={getDashboardLoadingSkeletonKind(pathname)} />
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#fffdf9] px-6 text-[#0d0d0c]">
        <div className="w-full max-w-sm border border-[#0d0d0c] bg-white p-6 text-center shadow-[8px_8px_0_#0d0d0c]">
          <p className="text-sm font-medium text-[#0d0d0c]/62">
            {error && !isUnauthenticated
              ? "Could not load your session."
              : "Redirecting to login..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#fffdf9] text-[#0d0d0c]">
      <div className="flex min-h-dvh">
        <aside className="hidden w-72 shrink-0 border-r border-[#0d0d0c]/10 bg-white px-5 py-6 lg:block">
          <Link href="/dashboard" className="mb-10 flex items-center">
            <BrandLogo priority className="w-32" />
          </Link>

          <nav className="space-y-1 text-sm font-medium">
            <DashboardNavItem
              active={
                pathname === "/dashboard" || pathname.startsWith("/room/")
              }
              href="/dashboard"
              icon={BookOpen}
              label="Rooms"
            />
            <DashboardNavItem icon={Library} label="Library" disabled />
            <DashboardNavItem icon={Sparkles} label="Study plans" disabled />
            <DashboardNavItem
              active={pathname === "/profile"}
              href="/profile"
              icon={UserRound}
              label="Profile"
            />
          </nav>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[#0d0d0c]/10 bg-[#fffdf9]/88 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link href="/dashboard" className="flex items-center lg:hidden">
                <BrandLogo priority className="w-28" />
              </Link>

              <div className="min-w-0 flex-1">
                <WorkspaceHeaderSearch />
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold leading-5">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#0d0d0c]/54">
                    {getUserHandle(user)}
                  </p>
                </div>
                <Link
                  href="/profile"
                  aria-label="Open profile"
                  aria-current={pathname === "/profile" ? "page" : undefined}
                  title="Open profile"
                  className="flex size-10 items-center justify-center rounded-md bg-[#0d0d0c] text-sm font-semibold text-white outline-none transition-colors hover:bg-[#2a2927] focus-visible:ring-2 focus-visible:ring-[#9d6550] focus-visible:ring-offset-2"
                >
                  {getInitials(user)}
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Log out"
                  title="Log out"
                  className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            </div>
            {logoutError ? (
              <p className="mt-3 text-right text-sm font-medium text-[#b13f2d]">
                {logoutError}
              </p>
            ) : null}
          </header>

          <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
