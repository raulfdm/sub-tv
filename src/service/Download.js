const https = require('https')
const fs = require('fs')
const path = require('path')
const unzip = require('unzip')

const download = subtitle => {
  return new Promise((resolve, reject) => {
    const rootPath = process.cwd()
    const outPath = path.format({
      dir: rootPath,
      name: subtitle.name,
      ext: '.zip',
    })

    const subtitleFile = fs.createWriteStream(outPath)

    https.get(subtitle.link, response => {
      response.pipe(subtitleFile)

      subtitleFile
        .on('finish', () => {
          subtitleFile.close()
          _unzipDownload(outPath)
          fs.unlinkSync(outPath)
          resolve(`Subtitle download successfully!\nCheck it in ${rootPath}`)
        })
        .on('error', err => {
          fs.unlink(subtitle.name)
          reject(err)
        })
    })
  })
}

const _unzipDownload = outPath => {
  fs.createReadStream(outPath).pipe(
    unzip.Extract({
      path: process.cwd(),
    })
  )
}

module.exports = download
