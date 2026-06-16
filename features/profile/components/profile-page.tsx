"use client";

import {
  BookOpen,
  CalendarDays,
  Globe,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { ShimmerBlock } from "@/components/shared/shimmer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import type { User } from "@/features/auth/types/auth.types";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import {
  getDisplayName,
  getInitials,
} from "@/features/workspace/utils/dashboard-utils";

export function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return <ProfilePageSkeleton />;
  }

  return <ProfilePageContent user={user} displayName={getDisplayName(user)} />;
}

function ProfilePageContent({
  user,
  displayName,
}: {
  user: User;
  displayName: string;
}) {
  const { data: rooms = [], isLoading: isRoomsLoading } = useRooms();
  const totalVideos = useMemo(
    () =>
      rooms.reduce((total, room) => total + (room._count?.roomVideos ?? 0), 0),
    [rooms],
  );

  return (
    <>
      <ProfileHero
        user={user}
        displayName={displayName}
        roomsCount={rooms.length}
        videosCount={totalVideos}
        loadingStats={isRoomsLoading}
      />

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
          <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold">Profile details</h2>
            <p className="mt-2 text-sm leading-6 text-[#0d0d0c]/58">
              Public-facing identity and contact fields for your workspace.
            </p>
          </div>
          <div className="grid gap-6 p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <ProfileMetric
                icon={UserRound}
                label="Handle"
                value={getPrimaryHandle(user)}
              />
              <ProfileMetric
                icon={Mail}
                label="Email"
                value={user.email ?? "Not set"}
              />
              <ProfileMetric
                icon={Phone}
                label="Phone"
                value={user.phone ?? "Not set"}
              />
              <ProfileMetric
                icon={Globe}
                label="Language"
                value={user.languageCode?.toUpperCase() ?? "Not set"}
              />
            </div>
          </div>
        </div>

        <ProfileSidebar
          roomsCount={rooms.length}
          videosCount={totalVideos}
          loadingStats={isRoomsLoading}
        />
      </section>
    </>
  );
}

function ProfileHero({
  user,
  displayName,
  roomsCount,
  videosCount,
  loadingStats,
}: {
  user: DashboardUser;
  displayName: string;
  roomsCount: number;
  videosCount: number;
  loadingStats: boolean;
}) {
  return (
    <section className="overflow-hidden border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
      <div className="relative h-44 border-b border-[#0d0d0c] bg-[#0d0d0c] sm:h-52">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,222,208,0.24)_0%,transparent_38%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:auto,34px_34px,34px_34px]" />
        <div className="absolute bottom-5 left-5 border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase text-white/78 backdrop-blur">
          learnOS profile
        </div>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid size-24 place-items-center border border-[#0d0d0c] bg-white p-1 shadow-[5px_5px_0_#f4ded0] sm:size-28">
            <div className="grid size-full place-items-center bg-[#0d0d0c] text-2xl font-semibold text-white">
              {getInitials(displayName, { uppercase: true })}
            </div>
          </div>
          <Button
            asChild
            className="w-fit rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
          >
            <Link href="/dashboard">Open rooms</Link>
          </Button>
        </div>

        <div className="mt-5">
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            {displayName}
          </h1>
          <p className="mt-1 text-base text-[#0d0d0c]/58">
            {getPrimaryHandle(user)}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#0d0d0c]/68">
            A focused YouTube learner organizing rooms, playlists, and study
            sessions in learnOS.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#0d0d0c]/58">
          <ProfileInlineMeta icon={MapPin} text="Workspace learner" />
          <ProfileInlineMeta
            icon={Globe}
            text={user.languageCode?.toUpperCase() ?? "Language not set"}
          />
          <ProfileInlineMeta icon={CalendarDays} text="Active session" />
        </div>

        <div className="mt-6 flex gap-6 border-t border-[#0d0d0c]/12 pt-5 text-sm">
          {loadingStats ? (
            <>
              <ShimmerBlock className="h-4 w-20" />
              <ShimmerBlock className="h-4 w-20" />
            </>
          ) : (
            <>
              <ProfileCount value={roomsCount} label="Rooms" />
              <ProfileCount value={videosCount} label="Videos" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ProfileSidebar({
  roomsCount,
  videosCount,
  loadingStats,
}: {
  roomsCount: number;
  videosCount: number;
  loadingStats: boolean;
}) {
  return (
    <aside className="grid gap-4">
      <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
        <p className="text-sm font-semibold uppercase text-[#9d6550]">
          Learning activity
        </p>
        <div className="mt-5 grid gap-3">
          {loadingStats ? (
            <>
              <ProfileActivitySkeleton />
              <ProfileActivitySkeleton />
            </>
          ) : (
            <>
              <ProfileActivity
                icon={BookOpen}
                label="Rooms"
                value={roomsCount}
              />
              <ProfileActivity
                icon={Video}
                label="Videos"
                value={videosCount}
              />
            </>
          )}
        </div>
      </div>

      <div className="border border-[#0d0d0c] bg-[#0d0d0c] p-5 text-white shadow-[8px_8px_0_#f4ded0] md:p-6">
        <p className="text-sm font-semibold uppercase text-[#f4ded0]">
          Next step
        </p>
        <p className="mt-4 text-sm leading-6 text-white/70">
          Open a room, choose a playlist item, and continue studying inside the
          embedded video view.
        </p>
        <Button
          asChild
          className="mt-5 rounded-md bg-[#f4ded0] text-[#0d0d0c] hover:bg-white"
        >
          <Link href="/dashboard">Go to rooms</Link>
        </Button>
      </div>
    </aside>
  );
}

function ProfileMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-[#0d0d0c]/12 bg-white p-4">
      <div className="flex items-center gap-2 text-[#9d6550]">
        <Icon className="size-4" />
        <p className="text-xs font-semibold uppercase tracking-normal text-[#0d0d0c]/48">
          {label}
        </p>
      </div>
      <p className="mt-4 break-words text-sm font-semibold text-[#0d0d0c]">
        {value}
      </p>
    </div>
  );
}

function ProfileInlineMeta({
  icon: Icon,
  text,
}: {
  icon: typeof Globe;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="size-4 text-[#9d6550]" />
      {text}
    </span>
  );
}

function ProfileCount({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <span className="font-semibold text-[#0d0d0c]">{value}</span>{" "}
      <span className="text-[#0d0d0c]/58">{label}</span>
    </div>
  );
}

function ProfileActivity({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-[#0d0d0c]/12 bg-[#fffaf5] p-4">
      <div className="flex items-center gap-3">
        <Icon className="size-4 text-[#9d6550]" />
        <span className="text-sm font-medium text-[#0d0d0c]/62">{label}</span>
      </div>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}


function ProfileActivitySkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 border border-[#0d0d0c]/12 bg-[#fffaf5] p-4">
      <div className="flex items-center gap-3">
        <ShimmerBlock className="size-4" />
        <ShimmerBlock className="h-4 w-20" />
      </div>
      <ShimmerBlock className="h-6 w-6" />
    </div>
  );
}

function ProfilePageSkeleton() {
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
              <ProfileActivitySkeleton />
              <ProfileActivitySkeleton />
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

function getPrimaryHandle(user: DashboardUser) {
  if (user.username) {
    return `@${user.username}`;
  }

  if (user.email) {
    return user.email;
  }

  return "@learnos";
}

type DashboardUser = User;
