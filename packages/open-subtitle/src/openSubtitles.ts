import type {
  OpenSubtitleFeatureApiResponse,
  OpenSubtitleLanguagesApiResponse,
  OpenSubtitleLoginReturnType,
  Token,
} from './types';
import got from 'got';

type OpenSubtitleApiClientReturnType = {
  login: (username: string, password: string, apiKey: string) => Promise<Token>;
  searchFeature: (query: string) => Promise<OpenSubtitleFeatureApiResponse>;
  fetchLanguages: () => Promise<OpenSubtitleLanguagesApiResponse['data']>;
};

export function createOpenSubtitleApiClient(): OpenSubtitleApiClientReturnType {
  let _token: string | null = null;
  let _apiKey: string | null = null;

  const api: OpenSubtitleApiClientReturnType = {
    login,
    searchFeature,
    fetchLanguages,
  };

  return api;

  async function login(username: string, password: string, apiKey: string): Promise<Token> {
    _apiKey = apiKey;

    if (_token === null) {
      const { token } = await got
        .post('https://api.opensubtitles.com/api/v1/login', {
          headers: getCommonHeaders(),
          json: {
            username,
            password,
          },
        })
        .json<OpenSubtitleLoginReturnType>();

      _token = token;
    }

    return _token;
  }

  async function searchFeature(query: string): Promise<OpenSubtitleFeatureApiResponse> {
    const { data } = await got
      .get(`https://api.opensubtitles.com/api/v1/subtitles?query=${encodeURI(query)}`, {
        headers: getCommonHeaders(),
      })
      .json<{ data: OpenSubtitleFeatureApiResponse }>();

    return data;
  }

  async function fetchLanguages() {
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

  function getCommonHeaders() {
    return {
      'Content-Type': 'application/json',
      'Api-Key': _apiKey || '',
      Authorization: _token !== null ? `Bearer ${_token}` : '',
    };
  }
}
