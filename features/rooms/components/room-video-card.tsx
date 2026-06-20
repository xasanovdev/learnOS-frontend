"use client";

import { ExternalLink, Film, Trash2 } from "lucide-react";
import Link from "next/link";

import { ShimmerBlock } from "@/components/shared/shimmer";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/features/rooms/utils/room-format";
import type { ReferencedVideo } from "@/features/videos/types/video.types";
import { formatDuration } from "@/features/videos/utils/video-format";

export function RoomVideoCard({
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

export function RoomVideoCardSkeleton() {
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
