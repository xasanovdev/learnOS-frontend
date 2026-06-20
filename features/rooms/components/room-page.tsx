"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { RoomDetails } from "@/features/rooms/components/room-details";
import { RoomPlaylist } from "@/features/rooms/components/room-playlist";
import { useRoomVideos } from "@/features/rooms/hooks/use-room-videos";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { DashboardNotice } from "@/features/workspace/components/dashboard-notice";
import { DashboardStateMessage } from "@/features/workspace/components/dashboard-state-message";
import { DashboardRoomSkeleton } from "@/features/workspace/components/skeletons/dashboard-room-skeleton";
import type { Notice } from "@/features/workspace/types/workspace.types";

export function RoomPage({ roomId }: { roomId: string }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [notice, setNotice] = useState<Notice | null>(null);

  const {
    data: rooms = [],
    error: roomsError,
    isLoading: isRoomsLoading,
    mutate: mutateRooms,
  } = useRooms();
  const room = useMemo(
    () => rooms.find((item) => item.id === roomId) ?? null,
    [roomId, rooms],
  );

  const {
    data: videos = [],
    error: videosError,
    isLoading: isVideosLoading,
    mutate: mutateVideos,
  } = useRoomVideos(roomId, !!roomId);

  const visibleVideos = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    if (!normalized) {
      return videos;
    }

    return videos.filter((video) =>
      [video.title, video.channelTitle]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalized)),
    );
  }, [searchQuery, videos]);

  return (
    <>
      <DashboardNotice notice={notice} className="mb-4" />

      {isRoomsLoading ? (
        <DashboardRoomSkeleton />
      ) : roomsError ? (
        <DashboardStateMessage
          title="Room unavailable"
          description="The dashboard could not load this room."
          action={<BackToRoomsAction />}
        />
      ) : !room ? (
        <DashboardStateMessage
          title="Room not found"
          description="This room does not exist or you no longer have access to it."
          action={<BackToRoomsAction />}
        />
      ) : (
        <>
          <RoomDetails
            room={room}
            videosCount={videos.length}
            visibleVideosCount={visibleVideos.length}
            mutateRooms={mutateRooms}
            onNotice={setNotice}
          />
          <RoomPlaylist
            roomId={roomId}
            videos={videos}
            visibleVideos={visibleVideos}
            videosError={videosError}
            isVideosLoading={isVideosLoading}
            mutateRooms={mutateRooms}
            mutateVideos={mutateVideos}
            onNotice={setNotice}
          />
        </>
      )}
    </>
  );
}

function BackToRoomsAction() {
  return (
    <Button
      asChild
      className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
    >
      <Link href="/dashboard">Back to rooms</Link>
    </Button>
  );
}
