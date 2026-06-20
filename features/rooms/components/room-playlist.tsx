"use client";

import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { KeyedMutator } from "swr";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  RoomVideoCard,
  RoomVideoCardSkeleton,
} from "@/features/rooms/components/room-video-card";
import {
  addVideoToRoom,
  removeVideoFromRoom,
} from "@/features/rooms/services/rooms.service";
import type { RoomSummary } from "@/features/rooms/types/room.types";
import type { ReferencedVideo } from "@/features/videos/types/video.types";
import { DashboardStateMessage } from "@/features/workspace/components/dashboard-state-message";
import type { Notice } from "@/features/workspace/types/workspace.types";

export function RoomPlaylist({
  roomId,
  videos,
  visibleVideos,
  videosError,
  isVideosLoading,
  mutateRooms,
  mutateVideos,
  onNotice,
}: {
  roomId: string;
  videos: ReferencedVideo[];
  visibleVideos: ReferencedVideo[];
  videosError: unknown;
  isVideosLoading: boolean;
  mutateRooms: KeyedMutator<RoomSummary[]>;
  mutateVideos: KeyedMutator<ReferencedVideo[]>;
  onNotice: (notice: Notice) => void;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [requestState, setRequestState] = useState<
    "video" | "removeVideo" | null
  >(null);

  async function handleAddVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedUrl = videoUrl.trim();

    if (!normalizedUrl) {
      onNotice({ tone: "error", text: "YouTube URL is required." });
      return;
    }

    setRequestState("video");

    try {
      await addVideoToRoom({ roomId, url: normalizedUrl });
      setVideoUrl("");
      await Promise.all([mutateVideos(), mutateRooms()]);
      onNotice({ tone: "success", text: "Video added to playlist." });
    } catch {
      onNotice({ tone: "error", text: "Could not add this video." });
    } finally {
      setRequestState(null);
    }
  }

  async function handleRemoveVideo(video: ReferencedVideo) {
    setRequestState("removeVideo");

    try {
      await removeVideoFromRoom(roomId, video.id);
      await Promise.all([mutateVideos(), mutateRooms()]);
      onNotice({ tone: "success", text: "Video removed from playlist." });
    } catch {
      onNotice({ tone: "error", text: "Could not remove this video." });
    } finally {
      setRequestState(null);
    }
  }

  return (
    <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
        <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
          <h2 className="text-2xl font-semibold">Room videos</h2>
          <p className="mt-2 text-sm leading-6 text-[#0d0d0c]/58">
            Choose a video from this room to enter the embedded study view.
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
                <RoomVideoCardSkeleton key={item} />
              ))}
            </div>
          ) : visibleVideos.length === 0 ? (
            <DashboardStateMessage
              title={
                videos.length === 0 ? "No videos yet" : "No matching videos"
              }
              description={
                videos.length === 0
                  ? "Add the first YouTube link to start building this room."
                  : "Try a different search term or clear the filter."
              }
            />
          ) : (
            <div className="grid gap-4">
              {visibleVideos.map((video) => (
                <RoomVideoCard
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
              New videos become part of this room and open in their own study
              page.
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
  );
}
