import { RequestHandler } from "express";

import { OpenSubtitles } from "../config/service";
import { Movie, Subtitles } from "../models";
import { fetchSeason } from "../services/season";
import { fetchEpisodes } from "../services/episodes";

export const search: RequestHandler = async (req, res) => {
  const service = await OpenSubtitles;

  if (!req.query.movieName) {
    res.json([]);
  }

  const result = await service.searchMoviesOnIMDB(req.query.movieName);

  res.json(result);
};

export const getDetails: RequestHandler = async (req, res) => {
  const service = await OpenSubtitles;

  const { imdbId } = req.params;
  const movie = new Movie(imdbId);

  try {
    const details = await service.getMovieDetails(imdbId);
    movie.details = details;

    const seasons = await fetchSeason(imdbId);
    movie.seasons = seasons;

    res.json(movie.apiResponse);
  } catch (error) {
    if (error.includes("not found")) {
      /* TODO: Add a scrapper to get from website */
      movie.details = { kind: "unknown", title: "unknown" };
      return res.json(movie.apiResponse);
    }
    res.status(505).json({ message: "something went wrong" });
  }
};

export const getEpisodes: RequestHandler = async (req, res) => {
  const { imdbId, season } = req.params;

  const episodes = await fetchEpisodes(imdbId, season);

  res.json(episodes);
};

export const getSubtitles: RequestHandler = async (req, res) => {
  const service = await OpenSubtitles;
  const { imdbId } = req.params;
  const { season, ep } = req.query;

  const result = await service.searchSubtitle(imdbId, season, ep);
  const normalizedData = Subtitles.fromApi(result);

  res.json(normalizedData);
};
