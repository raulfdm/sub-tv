import inquirer from '../config/inquirer';
import SeriesService from '../service/Series';

let seriesList = [];

export const fetchSeriesByUserInput = async (_, input) => {
  seriesList = await SeriesService.fetch(input);
  return seriesList.map(series => series.label);
};

export const filterUserAnswer = (answer, seriesToFilter = seriesList) =>
  seriesToFilter.find(series => series.label === answer);

const initialQuestion = () =>
  inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'chosen',
      message: 'Type series name, then choose it',
      source: fetchSeriesByUserInput,
      filter: filterUserAnswer,
    },
  ]);

export default initialQuestion;
