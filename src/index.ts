import program from 'commander';

import { showAppTitle } from './helpers';
// import { inquirer, spinner } from './instances';
import { SeriesPrompt, SeasonPrompt, EpisodesPrompt, SubtitlesPrompt } from './prompts';
import { DownloadService } from './service/Download';

import pkg from '../package.json';

program.version(pkg.version);

async function bootstrap() {
  showAppTitle();

  Promise.resolve()
    .then(SeriesPrompt)
    .then(SeasonPrompt)
    .then(EpisodesPrompt)
    .then(SubtitlesPrompt)
    .then(DownloadService.download)
    .then(result => {
      console.log(result);
      console.log(
        'Your subtitle has been download successfully. You can find it at',
        result.outDir,
      );
    })
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
}

bootstrap();
