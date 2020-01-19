import { state } from '../state';
import { API } from '../service/Api';
import { PromptFactory } from '../model/PromptFactory';
import { spinner } from '../instances';
import { EpisodeApiObject, PromptListQuestion } from '../types';

type EpisodeChoice = { name: string; value: EpisodeApiObject };

export function createChoices(episodes: EpisodeApiObject[]): EpisodeChoice[] {
  return episodes.map((ep) => ({
    name: `Episode ${ep.epNumber}: ${ep.title}`,
    value: ep,
  }));
}

export function filter(userEpisode: EpisodeApiObject): EpisodeApiObject {
  state.saveSelectedEpisode(userEpisode);

  return userEpisode;
}

export async function EpisodesPrompt(): Promise<unknown> {
  if (!state.isSeries) return;

  if (!state.getMovieDetails()) {
    throw new Error('No season details found');
  }

  spinner.start('Fetching available Episodes');

  const episodes = await API.fetchEpisodes(
    state.getMovieDetails()?.id!,
    state.selectedSeason!,
  );

  spinner.stop();

  return new PromptFactory<PromptListQuestion>({
    type: 'list',
    choices: createChoices(episodes),
    name: 'episode',
    filter,
    message: 'Which episode?',
  }).ask();
}
