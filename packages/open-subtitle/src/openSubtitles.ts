import invariant from 'tiny-invariant';

import type {
  OpenSubtitleFeatureApiResponse,
  OpenSubtitleLanguagesApiResponse,
  OpenSubtitleLoginReturnType,
  OpenSubtitleUserInfoApiResponse,
  UserCredentials,
} from './types';
import got from 'got';
import { OpenSubtitlesSubtitleApiResponse } from './types/subtitles';
import { OpenSubtitleDownloadApiResponse } from './types/download';

export function createOpenSubtitleApiClient() {
  let _token: string | null = null;
  let _apiKey: string | null = null;

  return {
    login,
    searchFeature,
    fetchLanguages,
    searchSubtitle,
    download,
    getUserInfo,
  };

  async function login(credentials: UserCredentials): Promise<void> {
    _apiKey = credentials.apiKey;

    if (_token === null) {
      const { token } = await got
        .post('https://api.opensubtitles.com/api/v1/login', {
          headers: getCommonHeaders(),
          json: {
            username: credentials.username,
            password: credentials.password,
          },
        })
        .json<OpenSubtitleLoginReturnType>();

      _token = token;
    }
  }

  async function searchFeature({
    query,
    featureId,
  }: {
    query?: string;
    featureId?: string;
  }): Promise<OpenSubtitleFeatureApiResponse['data']> {
    canFetch();

    const searchParams = new URLSearchParams();

    if (featureId) {
      searchParams.set('feature_id', featureId);
    } else if (query) {
      searchParams.set('query', query);
    } else {
      invariant(query || featureId, 'Either "query" or "featureId" is required');
    }

    const { data } = await got
      .get(`https://api.opensubtitles.com/api/v1/features?${searchParams.toString()}`, {
        headers: getCommonHeaders(),
      })
      .json<OpenSubtitleFeatureApiResponse>();

    return data;
  }

  async function searchSubtitle(featureId: string, langs: string[]) {
    canFetch();

    const searchParams = new URLSearchParams();

    searchParams.set('id', featureId);
    searchParams.set('languages', langs.join(','));

    const { data } = await got
      .get(`https://api.opensubtitles.com/api/v1/subtitles?${searchParams.toString()}`, {
        headers: getCommonHeaders(),
      })
      .json<OpenSubtitlesSubtitleApiResponse>();

    return data;
  }

  async function fetchLanguages() {
    canFetch();

    const { data } = await got
      .get('https://api.opensubtitles.com/api/v1/infos/languages', {
        headers: getCommonHeaders(),
      })
      .json<OpenSubtitleLanguagesApiResponse>();

    /**
     * Open Subtitle API returns an array of languages not properly sorted.
     */
    return data.sort((a, b) => a.language_name.localeCompare(b.language_name));
  }

  async function download(subtitleId: string) {
    canFetch();

    return got
      .post('https://api.opensubtitles.com/api/v1/download', {
        headers: getCommonHeaders(),
        json: {
          file_id: subtitleId,
        },
      })
      .json<OpenSubtitleDownloadApiResponse>();
  }

  async function getUserInfo(): Promise<OpenSubtitleUserInfoApiResponse['data']> {
    const { data } = await got
      .get(`https://api.opensubtitles.com/api/v1/infos/user`, {
        headers: getCommonHeaders(),
      })
      .json<OpenSubtitleUserInfoApiResponse>();

    return data;
  }

  function getCommonHeaders() {
    return {
      'Content-Type': 'application/json',
      'Api-Key': _apiKey || '',
      Authorization: _token !== null ? `Bearer ${_token}` : '',
    };
  }

  function canFetch() {
    if (_token === null && _apiKey === null) {
      throw new Error('Cannot fetch without token and apiKey');
    }
  }
}
