"use client";

import { Plus } from "lucide-react";

import { DashboardOverviewHeader } from "./dashboard-overview-header";
import { DashboardRoomCard } from "./dashboard-room-card";
import { Button } from "@/components/ui/button";
import type { RoomSummary } from "@/features/rooms/types/room.types";
import { DashboardStateMessage } from "@/features/workspace/components/dashboard-state-message";
import { RoomsGridSkeleton } from "@/features/workspace/components/skeletons/rooms-grid-skeleton";

export function DashboardRoomsPanel({
  error,
  isLoading,
  rooms,
  visibleRooms,
  onCreateRoom,
  onEditRoom,
  onDeleteRoom,
}: {
  error: unknown;
  isLoading: boolean;
  rooms: RoomSummary[];
  visibleRooms: RoomSummary[];
  onCreateRoom: () => void;
  onEditRoom: (room: RoomSummary) => void;
  onDeleteRoom: (room: RoomSummary) => void;
}) {
  return (
    <section className="mt-6 border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
      <DashboardOverviewHeader onCreateRoom={onCreateRoom} />

      <div className="p-5 sm:p-6">
        {error ? (
          <DashboardStateMessage
            title="Rooms unavailable"
            description="The dashboard could not load your rooms right now."
          />
        ) : isLoading ? (
          <RoomsGridSkeleton />
        ) : visibleRooms.length === 0 ? (
          <DashboardStateMessage
            title={rooms.length === 0 ? "No rooms yet" : "No matching rooms"}
            description={
              rooms.length === 0
                ? "Create your first room to start building focused playlists."
                : "Try a different search term or clear the filter."
            }
            action={
              rooms.length === 0 ? (
                <Button
                  type="button"
                  className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
                  onClick={onCreateRoom}
                >
                  <Plus className="size-4" />
                  Create room
                </Button>
              ) : null
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleRooms.map((room) => (
              <DashboardRoomCard
                key={room.id}
                room={room}
                onEdit={onEditRoom}
                onDelete={onDeleteRoom}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
