import debouncePromise from 'debounce-promise';

import { state } from '../state';
import { PromptFactory } from '../model/PromptFactory';
import { API } from '../service/Api';
import { SearchApiObject, PromptAutocompleteQuestion } from '../types';

export async function NamePrompt(): Promise<unknown> {
  async function fetchData(_: string, userInput: string): Promise<string[]> {
    if (!userInput) {
      return [];
    }

    const movies = await API.fetchMovies(userInput);

    state.saveMovies(movies);
    return movies.map(m => m.title);
  }

  function filter(userSelection: string): SearchApiObject {
    const movie = state.getMovieByTitle(userSelection);
    state.saveMovieSelectedByUser(movie);

    return movie;
  }

  return new PromptFactory<PromptAutocompleteQuestion>({
    source: debouncePromise(fetchData, 400),
    filter,
    name: 'movie_name',
    type: 'autocomplete',
    message: `What's the tv-series or movie name you're looking for? (The result can take a while, be patient)`,
  }).ask();
}
