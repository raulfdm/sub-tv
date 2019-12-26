// export const episodePrompt = listOfEpisodes => {

// };

import { SeasonModel } from '../models';
import { EpisodeService } from '../service/Episode';
import { inquirer } from '../instances';

export async function EpisodesPrompt(chosenSeason: SeasonModel) {
  const episodes = await EpisodeService.fetch(chosenSeason.link);

  const question = {
    choices: episodes.map(e => e.name),
    message: 'Choose the episode',
    name: 'episode',
    type: 'list',
    filter: function(answer) {
      return episodes.find(episode => episode.name === answer);
    },
  };

  // @ts-ignore
  return inquirer.prompt(question);
}
