import { fetcher } from "@/lib/api/fetcher";
import type { VideoProgress } from "@/features/videos/types/video.types";

export function startVideoSession(videoId: string) {
  return fetcher<VideoProgress>(`/videos/${videoId}/start`, {
    method: "POST",
  });
}
