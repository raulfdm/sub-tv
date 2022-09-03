import type { Feature } from '@sub-tv/open-subtitle';

import type { AppOptions } from '../modules/mainApp';

export type SubTvMachineContext = {
  selectedOption: AppOptions | null;
  subtitlesIdToDownload: string[];
  featureIdsToSearchFor: string[];
  feature: Feature | null;
};

export type SubTvMachineServices = {
  mainAppPrompt: {
    data: AppOptions;
  };
  featuresPrompt: {
    data: Feature;
  };
};
