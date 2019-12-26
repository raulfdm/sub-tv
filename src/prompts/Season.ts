import { inquirer } from '../instances';

import { SeasonService } from '../service/Season';
import { Series } from '../models';

export async function SeasonPrompt({ series }: { series: Series }) {
  const seasons = await SeasonService.fetch(series.value);

  const question = {
    choices: seasons.map(s => s.name),
    message: 'Choose the season',
    name: 'season',
    type: 'list',
    filter: function(answer) {
      return seasons.find(season => season.name === answer);
    },
  };

  //@ts-ignore
  return inquirer.prompt(question);
}
