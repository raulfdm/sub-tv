import type { OpenSubtitleFeatureApiResponse,OpenSubtitleLoginReturnType } from "@sub-tv/types";
import fetch from "cross-fetch";

type OpenSubtitleApiClientReturnType = {
  login: () => Promise<OpenSubtitleApiClientReturnType>;
  searchFeature: (query: string) => Promise<OpenSubtitleFeatureApiResponse>;
};

function createOpenSubtitleApiClient(): OpenSubtitleApiClientReturnType {
  let token: string | null = null;

  const commonHeaders = Object.freeze({
    "Content-Type": "application/json",
    "Api-Key": process.env["OPEN_SUB_API_TOKEN"] || "",
    Authorization: token !== null ? `Bearer ${token}` : ""
  });

  const api: OpenSubtitleApiClientReturnType = {
    login,
    searchFeature
  };

  return api;

  async function login(): Promise<OpenSubtitleApiClientReturnType> {
    if (token === null) {
      const options = {
        method: "POST",
        headers: {
          ...commonHeaders
        },
        body: JSON.stringify({
          username: process.env["OPEN_SUB_USERNAME"],
          password: process.env["OPEN_SUB_PASSWORD"]
        })
      };

      const response = await fetch("https://api.opensubtitles.com/api/v1/login", options);
      const result = (await response.json()) as OpenSubtitleLoginReturnType;

      token = result.token;
    }

    return api;
  }

  async function searchFeature(query: string): Promise<OpenSubtitleFeatureApiResponse> {
    const options = {
      method: "GET",
      headers: {
        ...commonHeaders
      }
    };

    const response = await fetch(`https://api.opensubtitles.com/api/v1/subtitles?query=${encodeURI(query)}`, options);
    const result = (await response.json()) as OpenSubtitleFeatureApiResponse;

    return result;
  }
}

export const openSubtitleApiClient = createOpenSubtitleApiClient();
