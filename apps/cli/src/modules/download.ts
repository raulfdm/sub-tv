import type { OpenSubtitleDownloadApiResponse } from '@sub-tv/open-subtitle';
import fs from 'fs';
import https from 'https';
import path from 'path';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';
import { inquirerUi } from '../config/inquirer';
import type { SubTvMachineContext } from '../types/main';

export async function downloadSubtitles(context: SubTvMachineContext): Promise<{
  remainingDownloads: OpenSubtitleDownloadApiResponse['remaining'] | null;
}> {
  let remainingDownloads: number | null = null;
  const downloadedSubtitlesIds = new Map();
  const errorSubtitles = new Map();

  const downloads = context.subtitlesIdToDownload.map(async (subtitleId) => {
    try {
      const downloadInfo = await apiClient.download(subtitleId);
      await download(downloadInfo.link, downloadInfo.file_name);
      remainingDownloads = downloadInfo.remaining;
      db.setDownloads(downloadInfo);
      downloadedSubtitlesIds.set(subtitleId, downloadInfo);
    } catch (error: any) {
      errorSubtitles.set(subtitleId, error);
      console.error(error.message);
    }
  });

  await Promise.all(downloads);

  inquirerUi.updateBottomBar(`All subtitles downloaded. Remaining downloads: ${remainingDownloads}\n\n`);

  return {
    remainingDownloads,
  };
}

function download(fileUrl: string, fileName: string) {
  return new Promise((resolve, reject) => {
    const destinationPath = path.join(process.cwd(), fileName);
    const file = fs.createWriteStream(destinationPath, { flags: 'wx' });

    const request = https.get(fileUrl, function (response) {
      if (response.statusCode === 200) {
        response.pipe(file);
      } else {
        reject('Error downloading file.');
      }
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(destinationPath, () => {}); // Delete temp file
      reject(err.message);
    });

    file.on('finish', () => {
      resolve(destinationPath);
    });

    file.on('error', (err: any) => {
      file.close();

      if (err.code === 'EEXIST') {
        reject('File already exists');
      } else {
        fs.unlink(destinationPath, () => {}); // Delete temp file
        reject(err.message);
      }
    });
  });
}
