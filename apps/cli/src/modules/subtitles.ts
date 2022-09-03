import type { Subtitle } from '@sub-tv/open-subtitle';
import invariant from 'tiny-invariant';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';
import { createPromptModule } from '../config/inquirer';
import type { SubTvMachineContext } from '../types/main';

export async function subtitlesPrompt(context: SubTvMachineContext) {
  invariant(context.feature, 'Feature is required');

  const prompt = createPromptModule();

  for await (const featureId of context.subtitlesIdToDownload) {
    const subtitles = await apiClient.searchSubtitle(featureId, db.preferredLanguages);

    const { subtitle } = await prompt<{ subtitle: Subtitle }>([
      {
        name: 'subtitle',
        type: 'checkbox',
        message: `Select the subtitle you want to download.`,
        choices: subtitles.map((subtitle) => ({
          name: `(${subtitle.attributes.language} - ${subtitle.attributes.download_count} downloads) ${subtitle.attributes.release}`,
          value: subtitle.id,
        })),

        pageSize: 30,
      },
    ]);
    console.log(subtitle);
  }
}
