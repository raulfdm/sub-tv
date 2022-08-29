import { PromptFactory } from '../model/PromptFactory';
import { state } from '../state';
import { PromptListQuestion, ChoiceType } from '../types';

/* TODO: fix unknown */
export async function SeasonPrompt(): Promise<unknown> {
  if (!state.isSeries) return;

  function filter(userInput: string): string {
    state.saveSelectedSeason(userInput);
    return userInput;
  }

  if (!state.getMovieDetails()) {
    throw new Error('No season details found');
  }

  const choices: ChoiceType[] = Object.keys(
    state.getMovieDetails()!.seasons,
  ).map((seasonNumber) => ({
    name: `Season ${seasonNumber}`,
    value: seasonNumber,
  }));

  return new PromptFactory<PromptListQuestion>({
    name: 'Season',
    type: 'list',
    message: 'Which season?',
    filter,
    choices,
  }).ask();
}
