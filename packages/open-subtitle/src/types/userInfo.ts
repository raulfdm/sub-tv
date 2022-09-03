export interface OpenSubtitleUserInfoApiResponse {
  data: {
    allowed_downloads: number;
    level: string;
    user_id: number;
    ext_installed: boolean;
    vip: boolean;
    downloads_count: number;
    remaining_downloads: number;
  };
}
