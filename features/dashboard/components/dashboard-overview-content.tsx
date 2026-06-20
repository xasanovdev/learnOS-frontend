"use client";

import { useMemo, useReducer } from "react";

import { DashboardRoomsPanel } from "./dashboard-rooms-panel";
import { DashboardStats } from "./dashboard-stats";
import {
  createRoom,
  deleteRoom,
  updateRoom,
} from "@/features/rooms/services/rooms.service";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import type { RoomSummary } from "@/features/rooms/types/room.types";
import {
  RoomDeleteModal,
  RoomFormModal,
} from "@/features/rooms/components/room-modals";
import { DashboardNotice } from "@/features/workspace/components/dashboard-notice";
import { DashboardPageHeader } from "@/features/workspace/components/dashboard-page-header";
import { DashboardStatsSkeleton } from "@/features/workspace/components/skeletons/dashboard-stats-skeleton";
import type { Notice } from "@/features/workspace/types/workspace.types";

type DashboardRequestState = "create" | "edit" | "delete" | null;

type DashboardPageState = {
  notice: Notice | null;
  createOpen: boolean;
  editingRoom: RoomSummary | null;
  deletingRoom: RoomSummary | null;
  requestState: DashboardRequestState;
};

type DashboardPageAction =
  | { type: "setNotice"; notice: Notice | null }
  | { type: "setCreateOpen"; open: boolean }
  | { type: "setEditingRoom"; room: RoomSummary | null }
  | { type: "setDeletingRoom"; room: RoomSummary | null }
  | { type: "setRequestState"; requestState: DashboardRequestState };

const initialDashboardPageState: DashboardPageState = {
  notice: null,
  createOpen: false,
  editingRoom: null,
  deletingRoom: null,
  requestState: null,
};

function dashboardPageReducer(
  state: DashboardPageState,
  action: DashboardPageAction,
): DashboardPageState {
  switch (action.type) {
    case "setNotice":
      return { ...state, notice: action.notice };
    case "setCreateOpen":
      return { ...state, createOpen: action.open };
    case "setEditingRoom":
      return { ...state, editingRoom: action.room };
    case "setDeletingRoom":
      return { ...state, deletingRoom: action.room };
    case "setRequestState":
      return { ...state, requestState: action.requestState };
  }
}

export function DashboardOverviewContent({
  displayName,
  searchQuery,
}: {
  displayName: string;
  searchQuery: string;
}) {
  const [state, dispatch] = useReducer(
    dashboardPageReducer,
    initialDashboardPageState,
  );
  const { data: rooms = [], error, isLoading, mutate } = useRooms();

  const visibleRooms = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    if (!normalized) {
      return rooms;
    }

    return rooms.filter((room) =>
      [room.title, room.description]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalized)),
    );
  }, [rooms, searchQuery]);

  const totalVideos = useMemo(
    () =>
      rooms.reduce((total, room) => total + (room._count?.roomVideos ?? 0), 0),
    [rooms],
  );

  async function handleCreate(values: { title: string; description: string }) {
    dispatch({ type: "setRequestState", requestState: "create" });

    try {
      const room = await createRoom(values);
      await mutate();
      dispatch({ type: "setCreateOpen", open: false });
      dispatch({
        type: "setNotice",
        notice: { tone: "success", text: "Room created." },
      });
      window.location.assign(`/room/${room.id}`);
    } catch {
      dispatch({
        type: "setNotice",
        notice: { tone: "error", text: "Could not create room." },
      });
    } finally {
      dispatch({ type: "setRequestState", requestState: null });
    }
  }

  async function handleEdit(values: { title: string; description: string }) {
    if (!state.editingRoom) {
      return;
    }

    dispatch({ type: "setRequestState", requestState: "edit" });

    try {
      await updateRoom(state.editingRoom.id, values);
      await mutate();
      dispatch({ type: "setEditingRoom", room: null });
      dispatch({
        type: "setNotice",
        notice: { tone: "success", text: "Room updated." },
      });
    } catch {
      dispatch({
        type: "setNotice",
        notice: { tone: "error", text: "Could not update room." },
      });
    } finally {
      dispatch({ type: "setRequestState", requestState: null });
    }
  }

  async function handleDelete() {
    if (!state.deletingRoom) {
      return;
    }

    dispatch({ type: "setRequestState", requestState: "delete" });

    try {
      await deleteRoom(state.deletingRoom.id);
      await mutate();
      dispatch({ type: "setDeletingRoom", room: null });
      dispatch({
        type: "setNotice",
        notice: { tone: "success", text: "Room deleted." },
      });
    } catch {
      dispatch({
        type: "setNotice",
        notice: { tone: "error", text: "Could not delete room." },
      });
    } finally {
      dispatch({ type: "setRequestState", requestState: null });
    }
  }

  return (
    <>
      <DashboardPageHeader
        eyebrow="Rooms"
        title={`Welcome back, ${displayName}`}
        description="Build a focused playlist around each topic. Open a room to pick a video, then move into the embedded study view."
      />

      <DashboardNotice notice={state.notice} className="mt-4" />

      {isLoading ? (
        <DashboardStatsSkeleton />
      ) : error ? (
        <DashboardStats status="unavailable" />
      ) : (
        <DashboardStats
          status="available"
          roomsCount={rooms.length}
          totalVideos={totalVideos}
          visibleRoomsCount={visibleRooms.length}
          filtered={!!searchQuery}
        />
      )}

      <DashboardRoomsPanel
        error={error}
        isLoading={isLoading}
        rooms={rooms}
        visibleRooms={visibleRooms}
        onCreateRoom={() => dispatch({ type: "setCreateOpen", open: true })}
        onEditRoom={(room) => dispatch({ type: "setEditingRoom", room })}
        onDeleteRoom={(room) => dispatch({ type: "setDeletingRoom", room })}
      />

      <RoomFormModal
        open={state.createOpen}
        mode="create"
        pending={state.requestState === "create"}
        onClose={() => dispatch({ type: "setCreateOpen", open: false })}
        onSubmit={handleCreate}
      />
      <RoomFormModal
        open={!!state.editingRoom}
        mode="edit"
        room={state.editingRoom}
        pending={state.requestState === "edit"}
        onClose={() => dispatch({ type: "setEditingRoom", room: null })}
        onSubmit={handleEdit}
      />
      <RoomDeleteModal
        open={!!state.deletingRoom}
        room={state.deletingRoom}
        pending={state.requestState === "delete"}
        onClose={() => dispatch({ type: "setDeletingRoom", room: null })}
        onConfirm={handleDelete}
      />
    </>
  );
}
