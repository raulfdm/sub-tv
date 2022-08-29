import type { OpenSubtitleFeatureApiResponse, OpenSubtitleLoginReturnType } from '@sub-tv/types';
import got from 'got';

type OpenSubtitleApiClientReturnType = {
  login: (username: string, password: string, apiKey: string) => Promise<void>;
  searchFeature: (query: string) => Promise<OpenSubtitleFeatureApiResponse>;
};

export function createOpenSubtitleApiClient(
  token: string | null = null,
  apiKey: string | null = null,
): OpenSubtitleApiClientReturnType {
  let _token: string | null = token;
  let _apiKey: string | null = apiKey;

  const api: OpenSubtitleApiClientReturnType = {
    login,
    searchFeature,
  };

  return api;

  async function login(username: string, password: string, apiKey: string): Promise<void> {
    if (_token === null) {
      const {
        data: { token },
      } = await got
        .post('https://api.opensubtitles.com/api/v1/login', {
          json: {
            username,
            password,
          },
        })
        .json<{ data: OpenSubtitleLoginReturnType }>();

      _apiKey = apiKey;
      _token = token;
    }
  }

  async function searchFeature(query: string): Promise<OpenSubtitleFeatureApiResponse> {
    const { data } = await got
      .get(`https://api.opensubtitles.com/api/v1/subtitles?query=${encodeURI(query)}`, {
        headers: getCommonHeaders(),
      })
      .json<{ data: OpenSubtitleFeatureApiResponse }>();

    return data;
  }

  function getCommonHeaders() {
    return {
      'Content-Type': 'application/json',
      'Api-Key': _apiKey || '',
      Authorization: _token !== null ? `Bearer ${_token}` : '',
    };
  }
}
