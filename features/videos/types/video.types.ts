export type ReferencedVideo = {
  id: string;
  sourceUrl: string;
  youtubeVideoId: string;
  title: string;
  description: string | null;
  channelId: string | null;
  channelTitle: string | null;
  channelUrl: string | null;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  embedHtml: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  roomId: string;
  roomVideoId: string;
  addedAt: string;
};

export type VideoProgress = {
  id: string;
  userId: string;
  videoId: string;
  spentSeconds: number;
  currentTimeSeconds: number;
  startedAt: string;
  lastActivityAt: string;
  finishedAt: string | null;
};
