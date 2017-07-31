const https = require('https')
const fs = require('fs')
const path = require('path')
const unzip = require('unzip')

const download = subtitle => {
  return new Promise((resolve, reject) => {

    const outPath = path.format({
      dir: process.cwd(),
      name: subtitle.name,
      ext: '.zip'
    })

    const subtitleFile = fs.createWriteStream(outPath)
    const request = https.get(subtitle.link, response => {
      response
        .pipe(subtitleFile)

      subtitleFile.on('finish', () => {
        subtitleFile.close()
        _unzipDownload(outPath)
        fs.unlinkSync(outPath)
        resolve('Arquivo baixado com sucesso!')
      }).on('error', err => {
        fs.unlink(subtitle.name)
        reject(err)
      })
    })
  })
}

const _unzipDownload = outPath => {
  fs.createReadStream(outPath)
    .pipe(unzip.Extract({
      path: process.cwd()
    }))
}

module.exports = download
