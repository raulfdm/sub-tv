import type { ApiResponseType, FeatureType } from "./base";

export interface OpenSubtitleFeatureApiResponse {
  data: Feature[];
}

interface Feature {
  id: string;
  type: ApiResponseType.Feature;
  attributes: Attributes;
}

interface Attributes {
  title: string;
  original_title: null | string;
  year: string;
  subtitles_counts: { [key: string]: number };
  subtitles_count: number;
  seasons_count: number;
  parent_title: string;
  season_number: number;
  episode_number: number | null;
  imdb_id: number;
  tmdb_id: number;
  parent_imdb_id: number | null;
  feature_id: string;
  title_aka: string[];
  feature_type: FeatureType;
  url: string;
  img_url: string;
  seasons: Season[];
}

interface Season {
  season_number: number;
  episodes: Episode[];
}

interface Episode {
  episode_number: number;
  title: string;
  feature_id: number;
  feature_imdb_id: number;
}
