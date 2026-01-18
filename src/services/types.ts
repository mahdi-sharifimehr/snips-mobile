export type HomeTitle = {
  id: string;
  nameEn: string;
  tags?: string[];
  posterUrl?: string;
  thumbnailUrl?: string;
  genres?: string[];
  badges?: string[];
  snipsCount?: number;
};

export type HomeComponent = {
  id: string;
  componentType: string;
  sectionTitle: string;
  titles: HomeTitle[];
};

export type HomeApiResponse = {
  data: {
    components: HomeComponent[];
  };
};

export type FeedTitle = {
  id: string;
  name_en: string;
  captions_en: string;
  poster_url: string;
  video_playback_url: string;
};

export type FeedApiResponse = {
  feedTitles: FeedTitle[];
  total: number;
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
};
