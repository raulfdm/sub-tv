export interface OpenSubtitleSearchReturnType {
  total_pages: number;
  total_count: number;
  page: number;
  data: Subtitle[];
}

interface Subtitle {
  id: string;
  type: string;
  attributes: Attributes;
}

interface Attributes {
  subtitle_id: string;
  language: string;
  download_count: number;
  new_download_count: number;
  hearing_impaired: boolean;
  hd: boolean;
  format: string;
  fps: number;
  votes: number;
  points: number;
  ratings: number;
  from_trusted: boolean;
  foreign_parts_only: boolean;
  ai_translated: boolean;
  machine_translated: boolean;
  upload_date: Date;
  release: string;
  comments: string;
  legacy_subtitle_id: number;
  uploader: Uploader;
  feature_details: FeatureDetails;
  url: string;
  related_links: RelatedLink[];
  files: File[];
}

interface FeatureDetails {
  feature_id: number;
  feature_type: string;
  year: number;
  title: string;
  movie_name: string;
  imdb_id: number;
  tmdb_id: number;
}

interface File {
  file_id: number;
  cd_number: number;
  file_name: string;
}

interface RelatedLink {
  label: string;
  url: string;
  img_url: string;
}

interface Uploader {
  uploader_id: number;
  name: string;
  rank: string;
}
