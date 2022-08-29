import { API } from './Api';
import { spinner } from '../instances';
import { state } from '../state';

export async function obtainDataByMovieKind(): Promise<void> {
  spinner.start(`Fetching subtitle details...`);

  const subtitles = await API.fetchSubtitles(
    state.getMovieDetails()?.id!,
    state.selectedSeason!,
    state.selectedEpisode?.epNumber.toString()!,
  );

  state.saveSubtitlesAndLanguages(subtitles);

  await spinner.succeed('Subtitles obtained');
}
