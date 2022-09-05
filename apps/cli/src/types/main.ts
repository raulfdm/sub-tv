import type { Feature } from '@sub-tv/open-subtitle';

import type { DownloadSubtitlesReturnType } from '../modules/download';
import type { LoginPromptReturnType } from '../modules/login';
import type { AppOptions } from '../modules/mainApp';

export type SubTvMachineContext = {
  selectedOption: AppOptions | null;
  subtitlesIdToDownload: string[];
  featureIdsToSearchFor: string[];
  feature: Feature | null;
};

export type SubTvMachineServices = {
  downloadSubtitles: {
    data: DownloadSubtitlesReturnType;
  };
  featuresPrompt: {
    data: Feature;
  };
  loginPrompt: {
    data: LoginPromptReturnType;
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
