import type { Metadata } from "next";

import { VideoPage } from "@/features/videos/components/video-page";

export const metadata: Metadata = {
  title: "Video | learnOS",
};

export default async function Page({
  params,
}: PageProps<"/room/[roomId]/video/[videoId]">) {
  const { roomId, videoId } = await params;

  return <VideoPage roomId={roomId} videoId={videoId} />;
}
