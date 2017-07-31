class Subtitle {
  constructor(rating, language, name, link) {
    this._rating = rating
    this._language = language
    this._name = name
    this._link = `https://www.tv-subs.com${link.replace('subtitles','subtitle')}.zip`
  }

  get name() {
    return this._name
  }
  get language() {
    return this._language
  }
  get rating() {
    return this._rating
  }
  get link() {
    return this._link
  }
}

module.exports = Subtitle
