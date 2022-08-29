import axios, { AxiosRequestConfig } from "axios";

import { DetailsApiResponse, EpisodeApiResponse, SubtitleApiResponse } from "../types";
import { generateApiUrl, errorHandling } from "../helpers";
import { OpenSubtitleFeatureApiResponse } from "@sub-tv/types";

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

  static fetchFeatures(query = ""): Promise<OpenSubtitleFeatureApiResponse> {
    return fetch(generateApiUrl(`/search?q=${query}`));
  }

  static fetchEpisodes(movieId: string, season: string): Promise<EpisodeApiResponse> {
    return fetch(generateApiUrl(`/${movieId}/${season}/episodes`));
  }

  static fetchSubtitles(movieId: string, season?: string, episode?: string): Promise<SubtitleApiResponse> {
    let urlResult = generateApiUrl(`/${movieId}/subtitles`);

    if (season && !episode) {
      throw new Error("Episode is required");
    }

    if (season && episode) {
      urlResult += `?season=${season}&ep=${episode}`;
    }

    return fetch(urlResult);
  }

  static downloadSingleSubtitle(zipLink: string): Promise<unknown> {
    return fetch(zipLink, { responseType: "stream" });
  }
}
