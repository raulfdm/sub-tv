import program from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import figlet from 'figlet';

import { fetchSeasons, seasonPrompt } from './service/Season';
import { fetchEpisodes, episodePrompt } from './service/Episode';
import { fetchSeries } from './service/Serie';
import { fetchSubtitles, subtitlePromp, subtitleLanguagePrompt } from './service/Subtitle';
import { download } from './service/Download';

import pkg from '../package.json';

program.version(pkg.version);

const initialQuestion = () => {
  let series = [];
  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'chosen',
      message: 'Type serie name, then choose it',
      source: async function(answersSoFar, input) {
        series = await fetchSeries(input);
        return series.map(serie => serie.label);
      },
      filter: function(answer) {
        return series.find(serie => serie.label === answer);
      },
    },
  ]);
};

async function bootstrap() {
  const spinner = ora();
  /* eslint-disable */
  console.log(figlet.textSync('Sub - TV'));
  /* eslint-enable */
  inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

  try {
    const serie = await initialQuestion();

    spinner.start('Fetching available seasons');
    const listOfSeasons = await fetchSeasons(serie.chosen.value);
    spinner.stop('well Done');
    const seasonChosen = await seasonPrompt(listOfSeasons);

    spinner.start('Fetching available Episodes');
    const listOfEpisodes = await fetchEpisodes(seasonChosen.season.link);
    spinner.stop('well Done');

    const episodeChosen = await episodePrompt(listOfEpisodes);

    spinner.start('Fetching available subtitles');
    const listOfSubtitles = await fetchSubtitles(episodeChosen.episode.link);
    spinner.stop('well Done');

    const languageChosen = await subtitleLanguagePrompt(listOfSubtitles.languagesAvailable);
    const subtitlesByLanguage = listOfSubtitles.getByLanguage(languageChosen.language);
    const subtitleChosen = await subtitlePromp(subtitlesByLanguage);

    spinner.start('Fetching your subtitle! It could take a while!');
    const result = await download(subtitleChosen.choose);
    spinner.succeed(result);
  } catch (error) {
    spinner.fail('Sorry, It was not possible to download your subtitle');
    /* eslint-disable */
    console.trace(error);
    /* eslint-enable */
  }
}

bootstrap();
program.parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
