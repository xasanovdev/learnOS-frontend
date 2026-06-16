"use client";

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ShimmerBlock } from "@/components/shared/shimmer";
import { Button } from "@/components/ui/button";
import { useRoomVideos } from "@/features/rooms/hooks/use-room-videos";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { formatDate } from "@/features/rooms/utils/room-format";
import { startVideoSession } from "@/features/videos/services/videos.service";
import type { VideoProgress } from "@/features/videos/types/video.types";
import {
  formatDateTime,
  formatDuration,
  getVideoEmbedUrl,
} from "@/features/videos/utils/video-format";
import { DashboardPageHeader } from "@/features/workspace/components/dashboard-page-header";
import { DashboardStateMessage } from "@/features/workspace/components/dashboard-state-message";
import type { Notice } from "@/features/workspace/types/workspace.types";
import { cn } from "@/lib/utils";

export function VideoPage({
  roomId,
  videoId,
}: {
  roomId: string;
  videoId: string;
}) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [progress, setProgress] = useState<VideoProgress | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const { data: rooms = [], error: roomsError, isLoading: isRoomsLoading } =
    useRooms();
  const room = useMemo(
    () => rooms.find((item) => item.id === roomId) ?? null,
    [roomId, rooms],
  );

  const {
    data: videos = [],
    error: videosError,
    isLoading: isVideosLoading,
  } = useRoomVideos(roomId, !!roomId);
  const video = useMemo(
    () => videos.find((item) => item.id === videoId) ?? null,
    [videoId, videos],
  );

  const currentIndex = useMemo(
    () => videos.findIndex((item) => item.id === videoId),
    [videoId, videos],
  );
  const previousVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex >= 0 && currentIndex < videos.length - 1
      ? videos[currentIndex + 1]
      : null;

  async function handleStartSession() {
    if (!video) {
      return;
    }

    setIsStarting(true);

    try {
      const nextProgress = await startVideoSession(video.id);
      setProgress(nextProgress);
      setNotice({ tone: "success", text: "Study session started." });
    } catch {
      setNotice({ tone: "error", text: "Could not start this study session." });
    } finally {
      setIsStarting(false);
    }
  }

  const embedUrl = video ? getVideoEmbedUrl(video) : null;
  const isMissing = !isRoomsLoading && !isVideosLoading && (!room || !video);

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

      {isRoomsLoading || isVideosLoading ? (
        <VideoPageSkeleton />
      ) : roomsError || videosError ? (
        <DashboardStateMessage
          title="Video unavailable"
          description="The player could not load this room or video."
          action={
            <Button asChild className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]">
              <Link href={`/room/${roomId}`}>Back to playlist</Link>
            </Button>
          }
        />
      ) : isMissing ? (
        <DashboardStateMessage
          title="Video not found"
          description="This video is not available in the selected room."
          action={
            <Button asChild className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]">
              <Link href={`/room/${roomId}`}>Back to playlist</Link>
            </Button>
          }
        />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
            >
              <Link href={`/room/${roomId}`}>
                <ArrowLeft className="size-4" />
                Back to playlist
              </Link>
            </Button>
            {previousVideo ? (
              <Button
                asChild
                variant="outline"
                className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
              >
                <Link href={`/room/${roomId}/video/${previousVideo.id}`}>
                  Previous video
                </Link>
              </Button>
            ) : null}
            {nextVideo ? (
              <Button
                asChild
                variant="outline"
                className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
              >
                <Link href={`/room/${roomId}/video/${nextVideo.id}`}>
                  Next video
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>

          <DashboardPageHeader
            eyebrow={room?.title ?? "Study room"}
            title={video?.title ?? "Loading video"}
            description={
              video?.channelTitle
                ? `${video.channelTitle} in embedded study mode.`
                : "Watch inside the room without leaving the workspace."
            }
            actions={
              <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
                <p className="text-sm font-semibold uppercase text-[#9d6550]">
                  Session
                </p>
                <div className="mt-5 grid gap-3">
                  <Button
                    type="button"
                    className="rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
                    disabled={isStarting}
                    onClick={handleStartSession}
                  >
                    <Play className="size-4" />
                    Start session
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
                  >
                    <a href={video?.sourceUrl} target="_blank" rel="noreferrer">
                      Open on YouTube
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            }
          />

          <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
              <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
                <h2 className="text-2xl font-semibold">Embedded player</h2>
              </div>
              <div className="p-5 sm:p-6">
                {embedUrl ? (
                  <div className="overflow-hidden border border-[#0d0d0c] bg-[#0d0d0c] shadow-[6px_6px_0_#f4ded0]">
                    <div className="aspect-video">
                      <iframe
                        src={embedUrl}
                        title={video?.title ?? "YouTube player"}
                        className="size-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <DashboardStateMessage
                    title="Embedded player unavailable"
                    description="This video cannot be rendered inline. Open it on YouTube instead."
                  />
                )}
              </div>
            </div>

            <aside className="grid gap-4">
              <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
                <p className="text-sm font-semibold uppercase text-[#9d6550]">
                  Video details
                </p>
                <dl className="mt-5 grid gap-3 text-sm">
                  <DetailLine
                    label="Duration"
                    value={formatDuration(video?.durationSeconds ?? null)}
                  />
                  <DetailLine
                    label="Added"
                    value={video ? formatDate(video.addedAt) : "Unknown"}
                  />
                  <DetailLine
                    label="Video ID"
                    value={video?.youtubeVideoId ?? "Unknown"}
                  />
                </dl>
              </div>

              <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
                <p className="text-sm font-semibold uppercase text-[#9d6550]">
                  Session state
                </p>
                {progress ? (
                  <div className="mt-5 grid gap-3 text-sm">
                    <DetailLine label="Progress ID" value={progress.id} />
                    <DetailLine
                      label="Started"
                      value={formatDateTime(progress.startedAt)}
                    />
                    <DetailLine
                      label="Current time"
                      value={`${progress.currentTimeSeconds}s`}
                    />
                  </div>
                ) : (
                  <p className="mt-5 text-sm leading-6 text-[#0d0d0c]/58">
                    Start a session to create a progress record for this study
                    view.
                  </p>
                )}
              </div>

              <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
                <p className="text-sm font-semibold uppercase text-[#9d6550]">
                  Playlist
                </p>
                <div className="mt-5 grid gap-3">
                  {videos.map((playlistVideo) => (
                    <Link
                      key={playlistVideo.id}
                      href={`/room/${roomId}/video/${playlistVideo.id}`}
                      className={cn(
                        "border p-3 text-sm transition-colors",
                        playlistVideo.id === videoId
                          ? "border-[#0d0d0c] bg-[#fff7f1]"
                          : "border-[#0d0d0c]/12 bg-white hover:bg-[#fffaf5]",
                      )}
                    >
                      <p className="line-clamp-2 font-semibold">
                        {playlistVideo.title}
                      </p>
                      <p className="mt-2 text-xs text-[#0d0d0c]/54">
                        {playlistVideo.channelTitle ?? "YouTube"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </>
      )}
    </>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#0d0d0c]/10 pt-3 first:border-t-0 first:pt-0">
      <dt className="text-[#0d0d0c]/54">{label}</dt>
      <dd className="min-w-0 truncate font-medium">{value}</dd>
    </div>
  );
}

function VideoPageSkeleton() {
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">
        <ShimmerBlock className="h-10 w-36 border border-[#0d0d0c]/10 bg-white" />
        <ShimmerBlock className="h-10 w-32 border border-[#0d0d0c]/10 bg-white" />
        <ShimmerBlock className="h-10 w-28 border border-[#0d0d0c]/10 bg-white" />
      </div>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#0d0d0c] md:p-6">
          <ShimmerBlock className="h-4 w-24" />
          <ShimmerBlock className="mt-5 h-10 max-w-2xl" />
          <ShimmerBlock className="mt-4 h-5 max-w-lg" />
        </div>
        <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
          <ShimmerBlock className="h-4 w-20" />
          <ShimmerBlock className="mt-5 h-10 w-full" />
          <ShimmerBlock className="mt-3 h-10 w-full" />
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border border-[#0d0d0c] bg-white shadow-[8px_8px_0_#0d0d0c]">
          <div className="border-b border-[#0d0d0c]/12 px-5 py-5 sm:px-6">
            <ShimmerBlock className="h-8 w-48" />
          </div>
          <div className="p-5 sm:p-6">
            <div className="border border-[#0d0d0c] bg-[#0d0d0c] shadow-[6px_6px_0_#f4ded0]">
              <ShimmerBlock className="aspect-video bg-[#1d1d1b]" />
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <VideoAsideSkeleton titleWidth="w-28" rows={3} />
          <VideoAsideSkeleton titleWidth="w-32" rows={3} />
          <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
            <ShimmerBlock className="h-4 w-20" />
            <div className="mt-5 grid gap-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="border border-[#0d0d0c]/12 bg-white p-3"
                >
                  <ShimmerBlock className="h-4 w-full" />
                  <ShimmerBlock className="mt-3 h-3 w-32" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function VideoAsideSkeleton({
  titleWidth,
  rows,
}: {
  titleWidth: string;
  rows: number;
}) {
  return (
    <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#f4ded0] md:p-6">
      <ShimmerBlock className={cn("h-4", titleWidth)} />
      <div className="mt-5 grid gap-3">
        {Array.from({ length: rows }).map((_, item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-4 border-t border-[#0d0d0c]/10 pt-3 first:border-t-0 first:pt-0"
          >
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-4 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
