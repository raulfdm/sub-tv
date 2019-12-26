import { inquirer, spinner } from '../instances';

import { SeasonService } from '../service/Season';
import { Series } from '../models';

export async function SeasonPrompt({ series }: { series: Series }) {
  spinner.start('Fetching available seasons');
  const seasons = await SeasonService.fetch(series.value);
  spinner.stop();

  const question = {
    choices: seasons.map(s => s.name),
    message: 'Choose the season',
    name: 'season',
    type: 'list',
    filter: function(answer) {
      const result = seasons.find(season => season.name === answer);
      return result;
    },
  };

  //@ts-ignore
  return inquirer.prompt(question);
}
