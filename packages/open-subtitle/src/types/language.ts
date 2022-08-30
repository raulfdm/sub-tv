type Language = {
  language_code: string;
  language_name: string;
};

export type OpenSubtitleLanguagesApiResponse = {
  data: Language[];
};
