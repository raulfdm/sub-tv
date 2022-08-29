import { Router } from "express";

import {
  search,
  getSubtitles,
  getDetails,
  getEpisodes
} from "../controllers/api";

const router = Router();

router.get("/search", search);

router.get("/:imdbId/subtitles", getSubtitles);

router.get("/:imdbId/details", getDetails);

router.get("/:imdbId/:season/episodes", getEpisodes);

export default router;
