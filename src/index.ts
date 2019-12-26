import program from 'commander';

import { showAppTitle } from './helpers';
import { inquirer, spinner } from './instances';
import { SeriesPrompt } from './prompts/Series';
// import { fetchSeasons, seasonPrompt } from './service/Season';
// import { fetchEpisodes, episodePrompt } from './service/Episode';
// import { fetchSeries } from './service/Serie';
// import { fetchSubtitles, subtitlePromp, subtitleLanguagePrompt } from './service/Subtitle';
// import { download } from './service/Download';

import pkg from '../package.json';

program.version(pkg.version);

async function bootstrap() {
  showAppTitle();

  Promise.resolve()
    .then(SeriesPrompt)
    .then(console.log)
    .catch(console.error);

  // try {
  //   const serie = await initialQuestion();
  //   spinner.start('Fetching available seasons');
  //   const listOfSeasons = await fetchSeasons(serie.chosen.value);
  //   spinner.stop();
  //   const seasonChosen = await seasonPrompt(listOfSeasons);
  //   spinner.start('Fetching available Episodes');
  //   const listOfEpisodes = await fetchEpisodes(seasonChosen.season.link);
  //   spinner.stop();
  //   const episodeChosen = await episodePrompt(listOfEpisodes);
  //   spinner.start('Fetching available subtitles');
  //   const listOfSubtitles = await fetchSubtitles(episodeChosen.episode.link);
  //   spinner.stop();
  //   const languageChosen = await subtitleLanguagePrompt(listOfSubtitles.languagesAvailable);
  //   const subtitlesByLanguage = listOfSubtitles.getByLanguage(languageChosen.language);
  //   const subtitleChosen = await subtitlePromp(subtitlesByLanguage);
  //   spinner.start('Fetching your subtitle! It could take a while!');
  //   const result = await download(subtitleChosen.choose);
  //   // @ts-ignore
  //   spinner.succeed(result);
  // } catch (error) {
  //   spinner.fail('Sorry, It was not possible to download your subtitle');
  //   console.trace(error);
  // }
}

bootstrap();
