import axios, { AxiosRequestConfig } from 'axios';

import {
  SearchApiResponse,
  DetailsApiResponse,
  EpisodeApiResponse,
  SubtitleApiResponse,
} from '../types';
import { generateApiUrl, errorHandling } from '../helpers';

function fetch<T>(url: string, opts?: AxiosRequestConfig): Promise<T> {
  return axios
    .get(url, opts)
    .then(res => res.data)
    .catch(errorHandling);
}

export class API {
  static fetchMovieDetails(movieId: string): Promise<DetailsApiResponse> {
    return fetch(generateApiUrl(`/${movieId}/details`));
  }

  static fetchMovies(movieName = ''): Promise<SearchApiResponse> {
    return fetch(generateApiUrl(`/search?movieName=${movieName}`));
  }

  static fetchEpisodes(movieId: string, season: string): Promise<EpisodeApiResponse> {
    return fetch(generateApiUrl(`/${movieId}/${season}/episodes`));
  }

  static fetchSubtitles(
    movieId: string,
    season?: string,
    episode?: string,
  ): Promise<SubtitleApiResponse> {
    let urlResult = generateApiUrl(`/${movieId}/subtitles`);

    if (season && !episode) {
      throw new Error('Episode is required');
    }

    if (season && episode) {
      urlResult += `?season=${season}&ep=${episode}`;
    }

    return fetch(urlResult);
  }

  static downloadSingleSubtitle(zipLink: string): Promise<unknown> {
    return fetch(zipLink, { responseType: 'stream' });
  }
}
