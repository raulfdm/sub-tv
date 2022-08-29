export type OpenSubtitleLoginReturnType = {
  user: {
    allowed_translations: number;
    allowed_downloads: number;
    level: string;
    user_id: number;
    ext_installed: boolean;
    vip: boolean;
  };
  token: string;
  status: number;
};
