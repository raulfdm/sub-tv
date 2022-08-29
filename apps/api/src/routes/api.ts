import express from "express";

import { search } from "../controllers/api";

const router = express.Router();

router.get("/search", search);

// router.get("/:imdbId/subtitles", getSubtitles);

// router.get("/:imdbId/details", getDetails);

// router.get("/:imdbId/:season/episodes", getEpisodes);

export default router;
