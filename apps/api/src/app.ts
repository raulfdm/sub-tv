import * as dotEnv from "dotenv";
dotEnv.config();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import pinoExpress from "express-pino-logger";

import apiRoutes from "./routes/api";

// import * as Sentry from "@sentry/node";

// import { OpenSubtitles } from "./config/service";

// Sentry.init({
//   dsn: process.env.SENTRY_DNS
// });

const PORT = 5001;
const app = express();

// // The request handler must be the first middleware on the app
// app.use(Sentry.Handlers.requestHandler());
/**
 * Handlers
 */
app.use(cors());
app.use(pinoExpress({ prettifier: true, enabled: false }));
app.use(bodyParser.json());

/**
 * Routes
 */
app.get("/", (_, res) => {
  res.status(200).json({ health: "ok" });
});
app.use("/api", apiRoutes);

/**
 * The error handler must be before any other error middleware and after all Routes
 */
// app.use(Sentry.Handlers.errorHandler());
app.use(function onError(_, res) {
  res.status(500).json({
    message: "Something get wrong in the server.",
    extra: `You can open an issue by clicking here: https://github.com/sub-tv/sub-tv-api/issues/new?assignees=raulfdm&labels=bug&template=unexpected_error.md&title=%5BError%20ID%5D:%20`
  });
});

app.listen(PORT, () => console.log(`Sub-tv API running on port: ${PORT}!`));
