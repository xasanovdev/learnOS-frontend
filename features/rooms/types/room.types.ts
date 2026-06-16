export type RoomSummary = {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    roomVideos?: number;
  };
};

export type RoomFormInput = {
  title: string;
  description: string;
};
