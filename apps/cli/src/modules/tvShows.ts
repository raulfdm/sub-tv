import type { Feature } from '@sub-tv/open-subtitle';
import inquirer from 'inquirer';

import { createPromptModule } from '../config/inquirer';
import type { SubTvMachineContext } from '../types/main';

export async function tvShowPrompt(context: SubTvMachineContext): Promise<string[]> {
  const prompt = createPromptModule();

  const allEpisodes = context.feature?.attributes.seasons.reduce((result, currentSeason) => {
    result.push(new inquirer.Separator(`Season ${currentSeason.season_number}`));
    result.push(
      ...currentSeason.episodes.map((episode) => ({
        name: `Ep ${episode.episode_number} - ${episode.title}`,
        value: episode.feature_id,
      })),
    );
    return result;
  }, [] as any);

  const { episodes: selectedEpisodes } = await prompt<{ episodes: Feature['id'][] }>([
    {
      type: 'checkbox',
      name: 'episodes',
      message: 'Select the episodes you want to download',
      choices: allEpisodes,
      pageSize: 30,
    },
  ]);

  return selectedEpisodes;
}
