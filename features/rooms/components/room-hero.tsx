"use client";

import { CalendarDays, FolderOpen, Pencil, Trash2, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { RoomSummary } from "@/features/rooms/types/room.types";
import { formatDate } from "@/features/rooms/utils/room-format";

export function RoomHero({
  room,
  videosCount,
  visibleVideosCount,
  onEdit,
  onDelete,
}: {
  room: RoomSummary;
  videosCount: number;
  visibleVideosCount: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <section className="overflow-hidden border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
      <div className="relative h-40 border-b border-[#0d0d0c] bg-[#0d0d0c] sm:h-48">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,222,208,0.24)_0%,transparent_38%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:auto,34px_34px,34px_34px]" />
        <div className="absolute bottom-5 left-5 border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase text-white/78 backdrop-blur">
          Study room
        </div>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid size-24 place-items-center border border-[#0d0d0c] bg-white p-1 shadow-[5px_5px_0_#f4ded0] sm:size-28">
            <div className="grid size-full place-items-center bg-[#fffaf5] text-[#9d6550]">
              <FolderOpen className="size-10" />
            </div>
          </div>

          <div className="flex w-fit gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Edit room"
              title="Edit room"
              className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
              onClick={onEdit}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Delete room"
              title="Delete room"
              className="rounded-md border-[#b13f2d]/16 bg-white text-[#b13f2d] hover:bg-[#fff0ec] hover:text-[#b13f2d]"
              onClick={onDelete}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            {room.title}
          </h1>
          <p className="mt-1 text-base text-[#0d0d0c]/58">
            {videosCount} videos in this room
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#0d0d0c]/68">
            {room.description ||
              "A focused space for collecting videos around one learning topic."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#0d0d0c]/58">
          <RoomInlineMeta
            icon={CalendarDays}
            text={`Updated ${formatDate(room.updatedAt)}`}
          />
          <RoomInlineMeta
            icon={Video}
            text={`${visibleVideosCount} visible`}
          />
          <RoomInlineMeta icon={FolderOpen} text="Room workspace" />
        </div>

        <div className="mt-6 flex gap-6 border-t border-[#0d0d0c]/12 pt-5 text-sm">
          <RoomCount value={videosCount} label="Videos" />
          <RoomCount value={visibleVideosCount} label="Visible" />
        </div>
      </div>
    </section>
  );
}

function RoomInlineMeta({
  icon: Icon,
  text,
}: {
  icon: typeof FolderOpen;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="size-4 text-[#9d6550]" />
      {text}
    </span>
  );
}

function RoomCount({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <span className="font-semibold text-[#0d0d0c]">{value}</span>{" "}
      <span className="text-[#0d0d0c]/58">{label}</span>
    </div>
  );
}
