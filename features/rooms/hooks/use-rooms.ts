"use client";

import useSWR from "swr";

import { getRooms } from "@/features/rooms/services/rooms.service";
import type { RoomSummary } from "@/features/rooms/types/room.types";

export function useRooms(enabled = true) {
  return useSWR<RoomSummary[]>(enabled ? "/rooms" : null, getRooms, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
}
