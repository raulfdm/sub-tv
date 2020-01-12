import { API } from './Api';
import { state } from '../state';
import { spinner } from '../instances';
import { DetailsApiResponse } from '../types';

export async function obtainMovieDetails(): Promise<DetailsApiResponse> {
  spinner.start(`Fetching ${state.movieSelected?.title} details...`);

  if (state.movieSelected?.id) {
    const movieDetails = await API.fetchMovieDetails(state.movieSelected?.id);
    state.saveMovieDetails(movieDetails);

    spinner.succeed('Details obtained');

    return movieDetails;
  }

  throw new Error('Movie ID is not found');
}
