"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardOverviewHeader({
  onCreateRoom,
}: {
  onCreateRoom: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#0d0d0c]/12 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">All rooms</h2>
        <p className="mt-2 text-sm leading-6 text-[#0d0d0c]/58">
          Choose a room to see its playlist, then open a video in the embedded
          study player.
        </p>
      </div>
      <Button
        type="button"
        className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
        onClick={onCreateRoom}
      >
        <Plus className="size-4" />
        New room
      </Button>
    </div>
  );
}
