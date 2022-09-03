import type { Feature, OpenSubtitleUserInfoApiResponse } from '@sub-tv/open-subtitle';

import type { AppOptions } from '../modules/mainApp';

export type SubTvMachineContext = {
  selectedOption: AppOptions | null;
  subtitlesIdToDownload: string[];
  featureIdsToSearchFor: string[];
  feature: Feature | null;
  userInfo: OpenSubtitleUserInfoApiResponse['data'] | null;
};

export type SubTvMachineServices = {
  mainAppPrompt: {
    data: AppOptions;
  };
  featuresPrompt: {
    data: Feature;
  };
  refreshSection: {
    data: void;
  };
  getUserInfo: {
    data: OpenSubtitleUserInfoApiResponse['data'];
  };
};
