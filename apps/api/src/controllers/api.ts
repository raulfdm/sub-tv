import { RequestHandler } from "express";

import { openSubtitleApiClient } from "../config/openSubtitle";
// import { Movie, Subtitles } from "../models";
// import { fetchEpisodes } from "../services/episodes";
// import { fetchSeason } from "../services/season";

export const search: RequestHandler = async (req, res) => {
  if (!req.query.movieName) {
    return res.json([]);
  }

  const result = await openSubtitleApiClient.searchFeature(req.query.movieName as string);

  console.log(result);
  res.json(result);
};

// export const getDetails: RequestHandler = async (req, res) => {
//   const service = await OpenSubtitles;

//   const { imdbId } = req.params;
//   const movie = new Movie(imdbId);

//   try {
//     const details = await service.getMovieDetails(imdbId);
//     movie.details = details;

//     const seasons = await fetchSeason(imdbId);
//     movie.seasons = seasons;

//     res.json(movie.apiResponse);
//   } catch (error) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//     // @ts-ignore
//     if ("message" in error && error.message.includes("not found")) {
//       /* TODO: Add a scrapper to get from website */
//       movie.details = { kind: "unknown", title: "unknown" };
//       return res.json(movie.apiResponse);
//     }
//     res.status(505).json({ message: "something went wrong" });
//   }
// };

// export const getEpisodes: RequestHandler = async (req, res) => {
//   const { imdbId, season } = req.params;

//   const episodes = await fetchEpisodes(imdbId, season);

//   res.json(episodes);
// };

// export const getSubtitles: RequestHandler = async (req, res) => {
//   const service = await OpenSubtitles;
//   const { imdbId } = req.params;
//   const { season, ep } = req.query;

//   const result = await service.searchSubtitle(imdbId, season as string, ep as string);
//   const normalizedData = Subtitles.fromApi(result);

//   res.json(normalizedData);
// };
