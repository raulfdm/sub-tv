import unzipper from 'unzipper';

import { state } from '../state';
import { API } from './Api';
import { spinner, config } from '../instances';

function extractFile(fileStream: NodeJS.ReadWriteStream): void {
  fileStream.pipe(
    unzipper.Extract({
      path: config.distPath,
    }),
  );
}

export async function downloadSubtitles(): Promise<void> {
  spinner.start('Downloading and extracting your subtitles');

  await Promise.all(
    state.getSelectedSubtitles()?.map(sub => {
      return (API.downloadSingleSubtitle(sub.zipLink) as Promise<NodeJS.ReadWriteStream>).then(
        extractFile,
      );
    }),
  );

  spinner.stop();
}
