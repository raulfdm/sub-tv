import inquirer from '../config/inquirer';

import { SeasonService } from '../service';

let seasonList = [];

export const fetchSeasonByUserInput = async input => {
  seasonList = await SeasonService.fetch(input);
  return seasonList.map(series => series.name);
};

export const filterUserAnswer = (answer, seasonsToFilter = seasonList) =>
  seasonsToFilter.find(season => season.name === answer);

const seasonPrompt = async chosenSeason => {
  const options = await fetchSeasonByUserInput(chosenSeason.value);

  return inquirer.prompt([
    {
      choices: options,
      message: 'Choose the season',
      name: 'season',
      type: 'list',
      filter: filterUserAnswer,
    },
  ]);
};

export default seasonPrompt;
