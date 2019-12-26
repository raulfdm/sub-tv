import program from 'commander';

import { SeriesPrompt, SeasonPrompt, EpisodesPrompt, SubtitlesPrompt } from './prompts';
import { DownloadService } from './service/Download';
import { showAppTitle, successMessage } from './helpers';
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
    .then(successMessage)
    .catch(console.error);
}

bootstrap();
