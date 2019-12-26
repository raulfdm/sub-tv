import axios from 'axios';
import unzipper from 'unzipper';

import { SubtitleModel } from '../models';

const rootPath = process.cwd();

export type DownloadReturn = {
  subtitle: SubtitleModel;
  outDir: string;
};

function extractFile(response) {
  response.data.pipe(
    unzipper.Extract({
      path: rootPath,
    }),
  );
}

function download({ subtitle }: { subtitle: SubtitleModel }): Promise<DownloadReturn> {
  return axios
    .get(subtitle.link, { responseType: 'stream' })
    .then(extractFile)
    .then(() => ({
      subtitle,
      outDir: rootPath,
    }));
}

export const DownloadService = {
  download,
};
