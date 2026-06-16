import { fetcher } from "@/lib/api/fetcher";
import type { RoomFormInput, RoomSummary } from "@/features/rooms/types/room.types";
import type { ReferencedVideo } from "@/features/videos/types/video.types";

export function getRooms() {
  return fetcher<RoomSummary[]>("/rooms");
}

export function getRoomVideos(roomId: string) {
  return fetcher<ReferencedVideo[]>(`/videos?roomId=${roomId}`);
}

export function createRoom(input: RoomFormInput) {
  return fetcher<RoomSummary>("/rooms", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateRoom(roomId: string, input: RoomFormInput) {
  return fetcher<RoomSummary>(`/rooms/${roomId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteRoom(roomId: string) {
  return fetcher<void>(`/rooms/${roomId}`, { method: "DELETE" });
}

export function addVideoToRoom(input: { roomId: string; url: string }) {
  return fetcher<ReferencedVideo>("/videos", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function removeVideoFromRoom(roomId: string, videoId: string) {
  return fetcher<void>(
    `/videos/${videoId}?roomId=${encodeURIComponent(roomId)}`,
    {
      method: "DELETE",
    },
  );
}
