import axios from 'axios';
import fs from 'fs';
import path from 'path';
import unzip from 'unzipper';

export const download = subtitle => {
  return new Promise((resolve, reject) => {
    const rootPath = process.cwd();
    const outPath = path.format({
      dir: rootPath,
      // @ts-ignore
      name: new Date().getTime(),
      ext: '.zip',
    });

    const subtitleFile = fs.createWriteStream(outPath);

    // @ts-ignore
    axios.get(subtitle.link, response => {
      response.pipe(subtitleFile);

      subtitleFile
        .on('finish', () => {
          subtitleFile.close();
          _unzipDownload(outPath);
          fs.unlinkSync(outPath);
          resolve(`Subtitle download successfully!\nCheck it in ${rootPath}`);
        })
        .on('error', err => {
          // @ts-ignore
          fs.unlink(subtitle.name);
          reject(err);
        });
    });
  });
};

const _unzipDownload = outPath => {
  fs.createReadStream(outPath).pipe(
    unzip.Extract({
      path: process.cwd(),
    }),
  );
};
