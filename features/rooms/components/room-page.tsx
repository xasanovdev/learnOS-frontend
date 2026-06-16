"use client";

import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Film,
  FolderOpen,
  Pencil,
  Plus,
  Trash2,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  addVideoToRoom,
  deleteRoom,
  removeVideoFromRoom,
  updateRoom,
} from "@/features/rooms/services/rooms.service";
import { ShimmerBlock } from "@/components/shared/shimmer";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RoomDeleteModal, RoomFormModal } from "@/features/rooms/components/room-modals";
import { useRoomVideos } from "@/features/rooms/hooks/use-room-videos";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { formatDate } from "@/features/rooms/utils/room-format";
import type { ReferencedVideo } from "@/features/videos/types/video.types";
import { formatDuration } from "@/features/videos/utils/video-format";
import { DashboardStateMessage } from "@/features/workspace/components/dashboard-state-message";
import { DashboardRoomSkeleton } from "@/features/workspace/components/skeletons/dashboard-room-skeleton";
import type { Notice } from "@/features/workspace/types/workspace.types";
import { cn } from "@/lib/utils";

export function RoomPage({ roomId }: { roomId: string }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [videoUrl, setVideoUrl] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [editingOpen, setEditingOpen] = useState(false);
  const [deletingOpen, setDeletingOpen] = useState(false);
  const [requestState, setRequestState] = useState<
    "edit" | "delete" | "video" | "removeVideo" | null
  >(null);

  const { data: rooms = [], error: roomsError, isLoading: isRoomsLoading, mutate: mutateRooms } =
    useRooms();
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

  async function handleEdit(values: {
    title: string;
    description: string;
  }) {
    if (!room) {
      return;
    }

    setRequestState("edit");

    try {
      await updateRoom(room.id, values);
      await mutateRooms();
      setEditingOpen(false);
      setNotice({ tone: "success", text: "Room updated." });
    } catch {
      setNotice({ tone: "error", text: "Could not update room." });
    } finally {
      setRequestState(null);
    }
  }

  async function handleDelete() {
    if (!room) {
      return;
    }

    setRequestState("delete");

    try {
      await deleteRoom(room.id);
      await mutateRooms();
      window.location.assign("/dashboard");
    } catch {
      setNotice({ tone: "error", text: "Could not delete room." });
      setRequestState(null);
    }
  }

  async function handleAddVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedUrl = videoUrl.trim();

    if (!normalizedUrl) {
      setNotice({ tone: "error", text: "YouTube URL is required." });
      return;
    }

    setRequestState("video");

    try {
      await addVideoToRoom({
        roomId,
        url: normalizedUrl,
      });
      setVideoUrl("");
      await Promise.all([mutateVideos(), mutateRooms()]);
      setNotice({ tone: "success", text: "Video added to playlist." });
    } catch {
      setNotice({ tone: "error", text: "Could not add this video." });
    } finally {
      setRequestState(null);
    }
  }

  async function handleRemoveVideo(video: ReferencedVideo) {
    setRequestState("removeVideo");

    try {
      await removeVideoFromRoom(roomId, video.id);
      await Promise.all([mutateVideos(), mutateRooms()]);
      setNotice({ tone: "success", text: "Video removed from playlist." });
    } catch {
      setNotice({ tone: "error", text: "Could not remove this video." });
    } finally {
      setRequestState(null);
    }
  }

  return (
    <>
      {notice ? (
        <div
          className={cn(
            "mb-4 border px-4 py-3 text-sm font-medium",
            notice.tone === "success"
              ? "border-[#1f7a5a]/20 bg-[#eaf5ef] text-[#1f7a5a]"
              : "border-[#b13f2d]/20 bg-[#fff0ec] text-[#b13f2d]",
          )}
        >
          {notice.text}
        </div>
      ) : null}

      {isRoomsLoading ? (
        <DashboardRoomSkeleton />
      ) : roomsError ? (
        <DashboardStateMessage
          title="Room unavailable"
          description="The dashboard could not load this room."
          action={
            <Button asChild className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]">
              <Link href="/dashboard">Back to rooms</Link>
            </Button>
          }
        />
      ) : !room ? (
        <DashboardStateMessage
          title="Room not found"
          description="This room does not exist or you no longer have access to it."
          action={
            <Button asChild className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]">
              <Link href="/dashboard">Back to rooms</Link>
            </Button>
          }
        />
      ) : (
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
            videosCount={videos.length}
            visibleVideosCount={visibleVideos.length}
            onEdit={() => setEditingOpen(true)}
            onDelete={() => setDeletingOpen(true)}
          />

          <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
              <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
                <h2 className="text-2xl font-semibold">Room videos</h2>
                <p className="mt-2 text-sm leading-6 text-[#0d0d0c]/58">
                  Choose a video from this room to enter the embedded study
                  view.
                </p>
              </div>
              <div className="p-5 sm:p-6">
                {videosError ? (
                  <DashboardStateMessage
                    title="Playlist unavailable"
                    description="Videos could not be loaded for this room."
                  />
                ) : isVideosLoading ? (
                  <div className="grid gap-4">
                    {[0, 1].map((item) => (
                      <VideoPlaylistCardSkeleton key={item} />
                    ))}
                  </div>
                ) : visibleVideos.length === 0 ? (
                  <DashboardStateMessage
                    title={videos.length === 0 ? "No videos yet" : "No matching videos"}
                    description={
                      videos.length === 0
                        ? "Add the first YouTube link to start building this room."
                        : "Try a different search term or clear the filter."
                    }
                  />
                ) : (
                  <div className="grid gap-4">
                    {visibleVideos.map((video) => (
                      <VideoPlaylistCard
                        key={video.roomVideoId}
                        roomId={roomId}
                        video={video}
                        removing={requestState === "removeVideo"}
                        onRemove={() => handleRemoveVideo(video)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
              <p className="text-sm font-semibold uppercase text-[#9d6550]">
                Add to room
              </p>
              <form className="mt-5 grid gap-4" onSubmit={handleAddVideo}>
                <Field>
                  <FieldLabel htmlFor="room-video-url">YouTube URL</FieldLabel>
                  <Input
                    id="room-video-url"
                    value={videoUrl}
                    onChange={(event) => setVideoUrl(event.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="h-11 rounded-md border-[#0d0d0c]/12 bg-[#fffaf5]"
                    disabled={requestState === "video"}
                  />
                  <FieldDescription>
                    New videos become part of this room and open in their own
                    study page.
                  </FieldDescription>
                </Field>
                <Button
                  type="submit"
                  className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
                  disabled={requestState === "video"}
                >
                  <Plus className="size-4" />
                  Add video
                </Button>
              </form>
            </aside>
          </section>
        </>
      )}

      <RoomFormModal
        open={editingOpen && !!room}
        mode="edit"
        room={room}
        pending={requestState === "edit"}
        onClose={() => setEditingOpen(false)}
        onSubmit={handleEdit}
      />
      <RoomDeleteModal
        open={deletingOpen && !!room}
        room={room}
        pending={requestState === "delete"}
        onClose={() => setDeletingOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

function RoomHero({
  room,
  videosCount,
  visibleVideosCount,
  onEdit,
  onDelete,
}: {
  room: NonNullable<ReturnType<typeof useRooms>["data"]>[number];
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
          <RoomInlineMeta icon={CalendarDays} text={`Updated ${formatDate(room.updatedAt)}`} />
          <RoomInlineMeta icon={Video} text={`${visibleVideosCount} visible`} />
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

function VideoPlaylistCard({
  roomId,
  video,
  removing,
  onRemove,
}: {
  roomId: string;
  video: ReferencedVideo;
  removing: boolean;
  onRemove: () => void;
}) {
  return (
    <article className="grid gap-4 border border-[#0d0d0c] bg-[#fffaf5] p-4 shadow-[4px_4px_0_#f4ded0] sm:grid-cols-[180px_minmax(0,1fr)_auto]">
      <div className="relative aspect-video overflow-hidden border border-[#0d0d0c]/12 bg-[#0d0d0c]">
        {video.thumbnailUrl ? (
          <div
            className="size-full bg-cover bg-center"
            style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
          />
        ) : (
          <div className="grid size-full place-items-center text-white">
            <Film className="size-8" />
          </div>
        )}
        <div className="absolute right-2 top-2 bg-white px-2 py-1 text-xs font-semibold text-[#0d0d0c]">
          {formatDuration(video.durationSeconds)}
        </div>
      </div>

      <div className="min-w-0 self-center">
        <h3 className="line-clamp-2 text-lg font-semibold">{video.title}</h3>
        <p className="mt-2 truncate text-sm text-[#0d0d0c]/58">
          {video.channelTitle ?? "YouTube"}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-[#0d0d0c]/44">
          <span>Added {formatDate(video.addedAt)}</span>
          <span>{video.youtubeVideoId}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-center">
        <Button
          asChild
          className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
        >
          <Link href={`/room/${roomId}/video/${video.id}`}>
            Study video
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="icon"
          aria-label="Open on YouTube"
          title="Open on YouTube"
          className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
        >
          <a href={video.sourceUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" />
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Remove from playlist"
          title="Remove from playlist"
          className="rounded-md border-[#b13f2d]/16 bg-white text-[#b13f2d] hover:bg-[#fff0ec] hover:text-[#b13f2d]"
          disabled={removing}
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </article>
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

function VideoPlaylistCardSkeleton() {
  return (
    <article className="grid gap-4 border border-[#0d0d0c] bg-[#fffaf5] p-4 shadow-[4px_4px_0_#f4ded0] sm:grid-cols-[180px_minmax(0,1fr)_auto]">
      <ShimmerBlock className="aspect-video border border-[#0d0d0c]/10 bg-[#0d0d0c]/10" />

      <div className="min-w-0 self-center">
        <ShimmerBlock className="h-5 w-full max-w-md" />
        <ShimmerBlock className="mt-3 h-4 w-44" />
        <div className="mt-4 flex flex-wrap gap-3">
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-3 w-28" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-center">
        <ShimmerBlock className="h-10 w-28" />
        <ShimmerBlock className="size-10" />
        <ShimmerBlock className="size-10" />
      </div>
    </article>
  );
}
