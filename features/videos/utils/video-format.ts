import type { ReferencedVideo } from "@/features/videos/types/video.types";

const dateTimeFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

export function formatDuration(seconds: number | null) {
  if (!seconds) {
    return "Unknown";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function getVideoEmbedUrl(video: ReferencedVideo) {
  if (!video.youtubeVideoId) {
    return null;
  }

  const search = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    autoplay: "0",
  });

  return `https://www.youtube.com/embed/${encodeURIComponent(
    video.youtubeVideoId,
  )}?${search.toString()}`;
}
