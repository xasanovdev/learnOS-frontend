"use client";

import useSWR from "swr";

import { getRoomVideos } from "@/features/rooms/services/rooms.service";
import type { ReferencedVideo } from "@/features/videos/types/video.types";

export function useRoomVideos(roomId: string | null, enabled = true) {
  return useSWR<ReferencedVideo[]>(
    enabled && roomId ? ["room-videos", roomId] : null,
    () => getRoomVideos(roomId!),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );
}
