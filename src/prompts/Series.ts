import { inquirer } from '../instances';
import { SeriesModel } from '../models/Series';
import { SeriesService } from '../service/Series';

export async function SeriesPrompt() {
  let series: SeriesModel[] = [];

  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'series',
      message: 'Type serie name, then choose it',
      source: async function(_: string, userInput: string) {
        series = await SeriesService.fetch(userInput);

        return series.map((serie: SeriesModel) => serie.label);
      },
      filter: function(userSelection) {
        const result = series.find((s: SeriesModel) => s.label === userSelection);
        return result;
      },
    },
  ]);
}
