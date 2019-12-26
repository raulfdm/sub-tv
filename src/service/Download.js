import https from 'https';
import fs from 'fs';
import path from 'path';
import unzip from 'unzip';

export const download = subtitle => {
  return new Promise((resolve, reject) => {
    const rootPath = process.cwd();
    const outPath = path.format({
      dir: rootPath,
      name: new Date().getTime(),
      ext: '.zip',
    });

    const subtitleFile = fs.createWriteStream(outPath);

    https.get(subtitle.link, response => {
      response.pipe(subtitleFile);

      subtitleFile
        .on('finish', () => {
          subtitleFile.close();
          _unzipDownload(outPath);
          fs.unlinkSync(outPath);
          resolve(`Subtitle download successfully!\nCheck it in ${rootPath}`);
        })
        .on('error', err => {
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
