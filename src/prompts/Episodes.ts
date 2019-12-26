import { inquirer, spinner } from '../instances';
import { SeasonModel } from '../models';
import { EpisodeService } from '../service/Episode';

export async function EpisodesPrompt({ season }: { season: SeasonModel }) {
  spinner.start('Fetching available Episodes');
  const episodes = await EpisodeService.fetch(season.link);
  spinner.stop();

  const question = {
    choices: episodes.map(e => e.name),
    message: 'Choose the episode',
    name: 'episode',
    type: 'list',
    filter: function(answer: string) {
      return episodes.find(episode => episode.name === answer);
    },
  };

  // @ts-ignore
  return inquirer.prompt(question);
}
