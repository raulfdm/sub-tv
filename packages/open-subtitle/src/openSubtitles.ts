import type {
  OpenSubtitleFeatureApiResponse,
  OpenSubtitleLanguagesApiResponse,
  OpenSubtitleLoginReturnType,
  UserCredentials,
} from './types';
import got from 'got';

type OpenSubtitleApiClientReturnType = {
  login: (credentials: UserCredentials) => Promise<void>;
  searchFeature: (query: string) => Promise<OpenSubtitleFeatureApiResponse>;
  fetchLanguages: () => Promise<OpenSubtitleLanguagesApiResponse['data']>;
};

export function createOpenSubtitleApiClient(): OpenSubtitleApiClientReturnType {
  let _token: string | null = null;
  let _apiKey: string | null = null;

  return {
    login,
    searchFeature,
    fetchLanguages,
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

  async function searchFeature(query: string): Promise<OpenSubtitleFeatureApiResponse> {
    canFetch();

    const { data } = await got
      .get(`https://api.opensubtitles.com/api/v1/subtitles?query=${encodeQuery(query)}`, {
        headers: getCommonHeaders(),
      })
      .json<{ data: OpenSubtitleFeatureApiResponse }>();

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

function encodeQuery(query: string) {
  return encodeURI(query).replaceAll('%20', '+');
}
