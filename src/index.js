const program = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const figlet = require('figlet');

const { fetchSeasons, seasonPrompt } = require('./service/Season');
const { fetchEpisodes, episodePrompt } = require('./service/Episode');
const { fetchSeries } = require('./service/Serie');
const { fetchSubtitles, subtitlePromp, subtitleLanguagePrompt } = require('./service/Subtitle');
const download = require('./service/Download');

const path = require('path');
const packageJsonRoot = path.join(__dirname, '../package.json');
const currentVersion = require(packageJsonRoot).version;

program.version(currentVersion);

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
  console.log(figlet.textSync('Sub - TV'));
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

    console.trace(error);
  }
}

bootstrap();
program.parse(process.argv);

if (!process.argv.slice(1).length) {
  program.outputHelp();
}
