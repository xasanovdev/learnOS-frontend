"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { KeyedMutator } from "swr";

import { Button } from "@/components/ui/button";
import { RoomHero } from "@/features/rooms/components/room-hero";
import {
  RoomDeleteModal,
  RoomFormModal,
} from "@/features/rooms/components/room-modals";
import {
  deleteRoom,
  updateRoom,
} from "@/features/rooms/services/rooms.service";
import type { RoomSummary } from "@/features/rooms/types/room.types";
import type { Notice } from "@/features/workspace/types/workspace.types";

export function RoomDetails({
  room,
  videosCount,
  visibleVideosCount,
  mutateRooms,
  onNotice,
}: {
  room: RoomSummary;
  videosCount: number;
  visibleVideosCount: number;
  mutateRooms: KeyedMutator<RoomSummary[]>;
  onNotice: (notice: Notice) => void;
}) {
  const router = useRouter();
  const [editingOpen, setEditingOpen] = useState(false);
  const [deletingOpen, setDeletingOpen] = useState(false);
  const [requestState, setRequestState] = useState<
    "edit" | "delete" | null
  >(null);

  async function handleEdit(values: {
    title: string;
    description: string;
  }) {
    setRequestState("edit");

    try {
      await updateRoom(room.id, values);
      await mutateRooms();
      setEditingOpen(false);
      onNotice({ tone: "success", text: "Room updated." });
    } catch {
      onNotice({ tone: "error", text: "Could not update room." });
    } finally {
      setRequestState(null);
    }
  }

  async function handleDelete() {
    setRequestState("delete");

    try {
      await deleteRoom(room.id);
    } catch {
      onNotice({ tone: "error", text: "Could not delete room." });
      setRequestState(null);
      return;
    }

    await mutateRooms(
      (currentRooms) =>
        currentRooms?.filter((currentRoom) => currentRoom.id !== room.id),
      { revalidate: false },
    ).catch(() => undefined);
    router.replace("/dashboard");
  }

  return (
    <>
      <div className="mb-4">
        <Button
          asChild
          variant="outline"
          className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
        >
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Back to rooms
          </Link>
        </Button>
      </div>

      <RoomHero
        room={room}
        videosCount={videosCount}
        visibleVideosCount={visibleVideosCount}
        onEdit={() => setEditingOpen(true)}
        onDelete={() => setDeletingOpen(true)}
      />

      <RoomFormModal
        open={editingOpen}
        mode="edit"
        room={room}
        pending={requestState === "edit"}
        onClose={() => setEditingOpen(false)}
        onSubmit={handleEdit}
      />
      <RoomDeleteModal
        open={deletingOpen}
        room={room}
        pending={requestState === "delete"}
        onClose={() => setDeletingOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
