import prompts from 'prompts';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';
import type { SubTvMachineContext } from '../types/main';

export async function subtitlesPrompt(context: SubTvMachineContext): Promise<string[]> {
  const subtitlesToDownload: string[] = [];

  for await (const featureId of context.featureIdsToSearchFor) {
    const subtitles = await apiClient.searchSubtitle(featureId, db.preferredLanguages);

    const { subtitle } = await prompts({
      name: 'subtitle',
      type: 'multiselect',
      message: `Select the subtitle you want to download.`,
      choices: subtitles.map((subtitle) => ({
        title: `[${subtitle.attributes.language}] ${subtitle.attributes.release}`,
        value: subtitle.attributes.files[0].file_id,
      })),
    });

    subtitlesToDownload.push(...subtitle);
  }

  return subtitlesToDownload;
}
