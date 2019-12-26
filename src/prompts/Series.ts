import { inquirer } from '../instances';
import { Series } from '../models/Series';
import { SeriesService } from '../service/Series';

export function SeriesPrompt() {
  let series = [];
  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'series',
      message: 'Type serie name, then choose it',
      source: async function(_, userInput) {
        series = await SeriesService.fetch(userInput);

        return series.map((serie: Series) => serie.label);
      },
      filter: function(userSelection) {
        const result = series.find((s: Series) => s.label === userSelection);
        return result;
      },
    },
  ]);
}
