"use client";

import { ArrowRight, FolderOpen, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import type { RoomSummary } from "@/features/rooms/types/room.types";
import { Button } from "@/components/ui/button";

export function DashboardRoomCard({
  room,
  onEdit,
  onDelete,
}: {
  room: RoomSummary;
  onEdit: (room: RoomSummary) => void;
  onDelete: (room: RoomSummary) => void;
}) {
  return (
    <article className="border border-[#0d0d0c] bg-[#fffaf5] p-5 shadow-[5px_5px_0_#0d0d0c]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center border border-[#0d0d0c]/14 bg-white">
            <FolderOpen className="size-5 text-[#9d6550]" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">{room.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase text-[#0d0d0c]/44">
              {room._count?.roomVideos ?? 0} videos
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            aria-label="Edit room"
            title="Edit room"
            className="rounded-md hover:bg-white"
            onClick={() => onEdit(room)}
          >
            <Pencil className="size-3" />
          </Button>
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            aria-label="Delete room"
            title="Delete room"
            className="rounded-md text-[#b13f2d] hover:bg-[#fff0ec] hover:text-[#b13f2d]"
            onClick={() => onDelete(room)}
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      </div>

      <p className="mt-5 min-h-12 text-sm leading-6 text-[#0d0d0c]/62">
        {room.description || "No description yet."}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-[#0d0d0c]/44">
          Open playlist and study flow
        </span>
        <Button
          asChild
          className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
        >
          <Link href={`/room/${room.id}`}>
            Open room
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
