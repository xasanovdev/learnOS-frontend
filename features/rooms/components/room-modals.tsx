"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { RoomSummary } from "@/features/rooms/types/room.types";
import { DashboardModal } from "@/features/workspace/components/dashboard-modal";

export function RoomFormModal({
  open,
  mode,
  room,
  pending,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: "create" | "edit";
  room?: RoomSummary | null;
  pending?: boolean;
  onClose: () => void;
  onSubmit: (values: { title: string; description: string }) => Promise<void>;
}) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "");
    const description = String(formData.get("description") ?? "");

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError("Room title is required.");
      return;
    }

    setError(null);
    await onSubmit({
      title: normalizedTitle,
      description: description.trim(),
    });
  }

  return (
    <DashboardModal
      open={open}
      title={mode === "create" ? "Create room" : "Edit room"}
      description={
        mode === "create"
          ? "Rooms collect a playlist of videos around a single study topic."
          : "Update the room name and summary without leaving the page."
      }
      onClose={onClose}
    >
      <form
        key={`${mode}-${room?.id ?? "new"}-${open ? "open" : "closed"}`}
        className="grid gap-5"
        onSubmit={handleSubmit}
      >
        <Field>
          <FieldLabel htmlFor="room-form-title">Room title</FieldLabel>
          <Input
            id="room-form-title"
            name="title"
            defaultValue={room?.title ?? ""}
            placeholder="React fundamentals"
            className="h-11 rounded-md border-[#0d0d0c]/12 bg-[#fffaf5]"
            disabled={pending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="room-form-description">Description</FieldLabel>
          <Input
            id="room-form-description"
            name="description"
            defaultValue={room?.description ?? ""}
            placeholder="Hooks, state, effects, and compiler-era patterns"
            className="h-11 rounded-md border-[#0d0d0c]/12 bg-[#fffaf5]"
            disabled={pending}
          />
          <FieldDescription>
            Keep it short enough to scan from the rooms overview.
          </FieldDescription>
        </Field>

        {error ? <FieldError>{error}</FieldError> : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
            onClick={onClose}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
            disabled={pending}
          >
            {mode === "create" ? "Create room" : "Save changes"}
          </Button>
        </div>
      </form>
    </DashboardModal>
  );
}

export function RoomDeleteModal({
  open,
  room,
  pending,
  onClose,
  onConfirm,
}: {
  open: boolean;
  room: RoomSummary | null;
  pending?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  return (
    <DashboardModal
      open={open}
      title="Delete room"
      description="This removes the room and its playlist association from your workspace."
      onClose={onClose}
      className="max-w-lg"
    >
      <div className="grid gap-5">
        <div className="border border-[#b13f2d]/16 bg-[#fff4ef] p-4 text-sm leading-6 text-[#7e2f22]">
          {room ? (
            <>
              <strong className="font-semibold text-[#7e2f22]">
                {room.title}
              </strong>{" "}
              will be removed from the dashboard.
            </>
          ) : (
            "This room will be removed from the dashboard."
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
            onClick={onClose}
            disabled={pending}
          >
            Keep room
          </Button>
          <Button
            type="button"
            className="rounded-md bg-[#b13f2d] text-white hover:bg-[#942f20]"
            onClick={onConfirm}
            disabled={pending}
          >
            Delete room
          </Button>
        </div>
      </div>
    </DashboardModal>
  );
}
