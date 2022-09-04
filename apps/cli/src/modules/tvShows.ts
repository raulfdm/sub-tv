import type { Choice } from 'prompts';
import prompts from 'prompts';

import type { SubTvMachineContext } from '../types/main';

export async function tvShowPrompt(context: SubTvMachineContext): Promise<string[]> {
  const allEpisodes = context.feature?.attributes.seasons.reduce((result, currentSeason) => {
    result.push(
      ...currentSeason.episodes.map((episode) => ({
        title: `[S${formatNumber(currentSeason.season_number)}E${formatNumber(episode.episode_number)}] ${
          episode.title
        }`,
        value: episode.feature_id,
      })),
    );

    return result;
  }, [] as Choice[]);

  const { episodes: selectedEpisodes } = await prompts({
    type: 'autocompleteMultiselect',
    name: 'episodes',
    message: 'Select the episodes you want to download',
    choices: allEpisodes,
  });

  return selectedEpisodes;
}

function formatNumber(number: number) {
  return number.toString().padStart(2, '0');
}
