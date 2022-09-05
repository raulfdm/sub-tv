import type { Feature, OpenSubtitleUserInfoApiResponse } from '@sub-tv/open-subtitle';

import type { AppOptions } from '../modules/mainApp';

export type SubTvMachineContext = {
  selectedOption: AppOptions | null;
  subtitlesIdToDownload: string[];
  featureIdsToSearchFor: string[];
  feature: Feature | null;
};

export type SubTvMachineServices = {
  downloadSubtitles: {
    data: {
      remainingDownloads: number | null;
    };
  };
  featuresPrompt: {
    data: Feature;
  };
  loginPrompt: {
    data: void;
  };
  mainAppPrompt: {
    data: AppOptions;
  };
  refreshSection: {
    data: void;
  };
  subtitlesPrompt: {
    data: string[];
  };
  tvShowPrompt: {
    data: string[];
  };
};
