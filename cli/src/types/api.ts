export type SearchApiObject = {
  title: string;
  id: string;
  from_redis?: string;
};

export type SearchApiResponse = SearchApiObject[];

export type DetailsApiResponse = {
  id: string;
  title: string;
  kind: 'tv series' | 'movie';
  seasons: {
    [seasonNumber: string]: string;
  };
};

export type EpisodeApiObject = {
  epNumber: number;
  link: string;
  title: string;
};

export type EpisodeApiResponse = EpisodeApiObject[];

export type SubtitleApiObject = {
  id: string;
  language: string;
  languageISO: string;
  fileName: string;
  zipLink: string;
};

export type SubtitleApiResponse = {
  [language: string]: SubtitleApiObject[];
};
