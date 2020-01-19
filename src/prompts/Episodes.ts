import { state } from '../state';
import { API } from '../service/Api';
import { PromptFactory } from '../model/PromptFactory';
import { spinner } from '../instances';
import { EpisodeApiObject, PromptListQuestion } from '../types';

export async function EpisodesPrompt(): Promise<unknown> {
  if (!state.isSeries) return;

  spinner.start('Fetching available Episodes');

  const episodes = await API.fetchEpisodes(
    state.getMovieDetails()?.id!,
    state.selectedSeason!,
  );

  spinner.stop();

  const choices = episodes.map((e: EpisodeApiObject) => ({
    name: `Episode ${e.epNumber}: ${e.title}`,
    value: e,
  }));

  function filter(userEpisode: EpisodeApiObject): EpisodeApiObject {
    state.saveSelectedEpisode(userEpisode);

    return userEpisode;
  }

  if (!state.getMovieDetails()) {
    throw new Error('No season details found');
  }

  return new PromptFactory<PromptListQuestion>({
    type: 'list',
    choices,
    name: 'episode',
    filter,
    message: 'Which episode?',
  }).ask();
}
