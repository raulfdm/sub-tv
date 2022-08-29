import { config } from "dotenv";
config();
import * as cron from "node-cron";
import { OpenSubtitles } from "./config/service";
import * as Sentry from "@sentry/node";
import pino from "express-pino-logger";
import express, { Request, NextFunction, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import apiRoutes from "./routes/api";

cron.schedule("* */10 * * *", async function() {
  await (await OpenSubtitles).wakeUp();
  // await (await OpenSubtitles).resetTokens();
});

Sentry.init({
  dsn: process.env.SENTRY_DNS
});

const port = 3000;
const app = express();

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(cors());
app.use(pino());
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (_, res) => {
  res.status(200).json({ health: "ok" });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// @ts-ignore
app.use(function onError(
  _err: Error,
  _req_: Request,
  res: Response & { sentry: string },
  _next: NextFunction
) {
  res.status(500).json({
    message: "Something get wrong in the server.",
    extra: `You can open an issue by clicking here: https://github.com/sub-tv/sub-tv-api/issues/new?assignees=raulfdm&labels=bug&template=unexpected_error.md&title=%5BError%20ID%5D:%20${res.sentry}`
  });
});

app.listen(port, () => console.log(`Sub-tv API running on port: ${port}!`));
