require('pretty-error').start();

import {
  SeasonPrompt,
  EpisodesPrompt,
  SubtitlesPrompt,
  NamePrompt,
  LanguagePrompt,
} from './prompts';
import {
  downloadSubtitles,
  obtainDataByMovieKind,
  obtainMovieDetails,
} from './service';
import { showAppTitle, errorHandling, successMessage } from './helpers';

showAppTitle()
  .then(NamePrompt)
  .then(obtainMovieDetails)
  .then(SeasonPrompt) /* This wont run if isn't series */
  .then(EpisodesPrompt) /* This wont run if isn't series */
  .then(obtainDataByMovieKind)
  .then(LanguagePrompt)
  .then(SubtitlesPrompt)
  .then(downloadSubtitles)
  .then(successMessage)
  .catch(errorHandling);
