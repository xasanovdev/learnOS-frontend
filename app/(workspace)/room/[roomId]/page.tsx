import type { Metadata } from "next";

import { RoomPage } from "@/features/rooms/components/room-page";

export const metadata: Metadata = {
  title: "Room | learnOS",
};

export default async function Page({ params }: PageProps<"/room/[roomId]">) {
  const { roomId } = await params;

  return <RoomPage roomId={roomId} />;
}
