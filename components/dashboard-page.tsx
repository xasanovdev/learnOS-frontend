"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock,
  Library,
  LogOut,
  Play,
  Plus,
  Search,
  Sparkles,
  UserRound,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAuth, type User } from "@/hooks/use-auth";

const quickStats = [
  {
    label: "Study sessions",
    value: "0",
    detail: "Ready for your first lesson",
    icon: BookOpen,
    color: "text-[#1f7a5a]",
  },
  {
    label: "Focus time",
    value: "0m",
    detail: "Tracked from completed videos",
    icon: Clock,
    color: "text-[#2f6f91]",
  },
  {
    label: "Quiz streak",
    value: "0",
    detail: "Starts after the first quiz",
    icon: CheckCircle2,
    color: "text-[#d95d39]",
  },
];

const workspaceItems = [
  {
    title: "Paste a YouTube lesson",
    description: "Create a focused transcript, summary, quiz, and chat space.",
    icon: Video,
  },
  {
    title: "Review saved materials",
    description: "Your processed sessions will appear here as a compact queue.",
    icon: Library,
  },
  {
    title: "Ask for a study path",
    description: "Turn a broad topic into a sequence of watchable steps.",
    icon: Sparkles,
  },
];

export function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, isUnauthenticated, error, mutate } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    if (isUnauthenticated) {
      router.replace("/auth?next=/dashboard");
    }
  }, [isUnauthenticated, router]);

  const displayName = useMemo(() => getDisplayName(user), [user]);

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await logout();
      await mutate(undefined, { revalidate: false });
      router.replace("/auth");
      router.refresh();
    } catch {
      setLogoutError("Could not log out. Try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f6f7f5] px-6 text-[#0e1512]">
        <div className="w-full max-w-sm border border-[#0e1512]/12 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-[#0e1512]/62">
            {error && !isUnauthenticated
              ? "Could not load your session."
              : "Redirecting to login..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#f6f7f5] text-[#0e1512]">
      <div className="flex min-h-dvh">
        <aside className="hidden w-72 shrink-0 border-r border-[#0e1512]/10 bg-white px-5 py-6 lg:block">
          <Link href="/dashboard" className="mb-10 flex items-center">
            <BrandLogo priority className="w-32" />
          </Link>

          <nav className="space-y-1 text-sm font-medium">
            <DashboardNavItem active icon={BookOpen} label="Workspace" />
            <DashboardNavItem icon={Library} label="Library" />
            <DashboardNavItem icon={Sparkles} label="Study plans" />
            <DashboardNavItem icon={UserRound} label="Profile" />
          </nav>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[#0e1512]/10 bg-[#f6f7f5]/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link href="/dashboard" className="flex items-center lg:hidden">
                <BrandLogo priority className="w-28" />
              </Link>

              <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-md border border-[#0e1512]/12 bg-white px-3 py-2 text-sm text-[#0e1512]/48 md:flex">
                <Search className="size-4" />
                <span className="truncate">Search sessions, notes, quizzes</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold leading-5">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#0e1512]/54">
                    {getUserHandle(user)}
                  </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-md bg-[#0e1512] text-sm font-semibold text-white">
                  {getInitials(user)}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Log out"
                  title="Log out"
                  className="rounded-md border-[#0e1512]/12 bg-white hover:bg-[#eef2ec]"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            </div>
            {logoutError && (
              <p className="mt-3 text-right text-sm font-medium text-[#b13f2d]">
                {logoutError}
              </p>
            )}
          </header>

          <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="border border-[#0e1512]/12 bg-white p-5 shadow-sm md:p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-normal text-[#1f7a5a]">
                      Dashboard
                    </p>
                    <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-normal md:text-4xl">
                      Welcome back, {displayName}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#0e1512]/62">
                      Build focused study sessions from long videos and keep
                      the work organized in one place.
                    </p>
                  </div>

                  <Button
                    type="button"
                    className="h-11 rounded-md bg-[#0e1512] px-4 text-white hover:bg-[#24302b]"
                  >
                    <Plus className="size-4" />
                    New session
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {quickStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-md border border-[#0e1512]/10 bg-[#f6f7f5] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-normal text-[#0e1512]/48">
                          {stat.label}
                        </p>
                        <stat.icon className={cn("size-4", stat.color)} />
                      </div>
                      <p className="mt-4 text-3xl font-semibold">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#0e1512]/56">
                        {stat.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#0e1512]/12 bg-[#12231d] p-5 text-white shadow-sm md:p-6">
                <p className="text-sm font-semibold uppercase tracking-normal text-[#9ce2bd]">
                  Account
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-md bg-white text-lg font-semibold text-[#12231d]">
                    {getInitials(user)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">
                      {displayName}
                    </p>
                    <p className="truncate text-sm text-white/58">
                      {getUserHandle(user)}
                    </p>
                  </div>
                </div>
                <dl className="mt-7 grid gap-3 text-sm">
                  <AccountLine label="External ID" value={user.externalId} />
                  <AccountLine
                    label="Language"
                    value={user.languageCode?.toUpperCase() ?? "Not set"}
                  />
                  <AccountLine label="Phone" value={user.phone ?? "Not set"} />
                </dl>
              </div>
            </section>

            <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="border border-[#0e1512]/12 bg-white shadow-sm">
                <div className="border-b border-[#0e1512]/10 p-5 md:p-6">
                  <h2 className="text-xl font-semibold tracking-normal">
                    Workspace
                  </h2>
                </div>
                <div className="divide-y divide-[#0e1512]/10">
                  {workspaceItems.map((item) => (
                    <div
                      key={item.title}
                      className="grid gap-4 p-5 md:grid-cols-[40px_minmax(0,1fr)_auto] md:items-center md:p-6"
                    >
                      <div className="flex size-10 items-center justify-center rounded-md bg-[#eef2ec] text-[#1f7a5a]">
                        <item.icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#0e1512]/58">
                          {item.description}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label={item.title}
                        title={item.title}
                        className="rounded-md border-[#0e1512]/12 bg-white hover:bg-[#eef2ec]"
                      >
                        <Play className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#0e1512]/12 bg-white p-5 shadow-sm md:p-6">
                <h2 className="text-xl font-semibold tracking-normal">
                  Recent activity
                </h2>
                <div className="mt-8 flex min-h-52 flex-col items-center justify-center rounded-md border border-dashed border-[#0e1512]/18 bg-[#f6f7f5] px-5 text-center">
                  <Clock className="size-8 text-[#2f6f91]" />
                  <p className="mt-4 text-sm font-semibold">No activity yet</p>
                  <p className="mt-2 max-w-56 text-xs leading-5 text-[#0e1512]/56">
                    Your processed videos, quizzes, and notes will show up
                    here.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardSkeleton() {
  return (
    <main className="min-h-dvh bg-[#f6f7f5] p-4 text-[#0e1512] md:p-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-72 animate-pulse border border-[#0e1512]/10 bg-white" />
        <div className="h-72 animate-pulse border border-[#0e1512]/10 bg-white" />
        <div className="h-96 animate-pulse border border-[#0e1512]/10 bg-white lg:col-span-2" />
      </div>
    </main>
  );
}

function DashboardNavItem({
  active = false,
  icon: Icon,
  label,
}: {
  active?: boolean;
  icon: typeof BookOpen;
  label: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center gap-3 rounded-md px-3 text-left transition-colors",
        active
          ? "bg-[#0e1512] text-white"
          : "text-[#0e1512]/62 hover:bg-[#eef2ec] hover:text-[#0e1512]",
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </button>
  );
}

function AccountLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/12 pt-3">
      <dt className="text-white/50">{label}</dt>
      <dd className="min-w-0 truncate font-medium">{value}</dd>
    </div>
  );
}

function getDisplayName(user: User | null) {
  if (!user) {
    return "Student";
  }

  return (
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Student"
  );
}

function getUserHandle(user: User) {
  if (user.username) {
    return `@${user.username}`;
  }

  if (user.email) {
    return user.email;
  }

  return `ID ${user.externalId}`;
}

function getInitials(user: User) {
  const source = getDisplayName(user)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return source || "LO";
}
