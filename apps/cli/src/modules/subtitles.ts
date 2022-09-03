import { apiClient } from '../config/apiClient';
import { db } from '../config/db';
import { createPromptModule } from '../config/inquirer';
import type { SubTvMachineContext } from '../types/main';

export async function subtitlesPrompt(context: SubTvMachineContext): Promise<string[]> {
  const prompt = createPromptModule();

  const subtitlesToDownload: string[] = [];

  for await (const featureId of context.featureIdsToSearchFor) {
    const subtitles = await apiClient.searchSubtitle(featureId, db.preferredLanguages);

    const { subtitle } = await prompt<{ subtitle: string[] }>([
      {
        name: 'subtitle',
        type: 'checkbox',
        message: `Select the subtitle you want to download.`,
        choices: subtitles.map((subtitle) => ({
          name: `(${subtitle.attributes.language} - ${subtitle.attributes.download_count} downloads) ${subtitle.attributes.release}`,
          value: subtitle.attributes.files[0].file_id,
        })),

        pageSize: 30,
      },
    ]);
    subtitlesToDownload.push(...subtitle);
  }

  return subtitlesToDownload;
}
