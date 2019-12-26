export class Subtitle {
  constructor(rating, language, release, link) {
    this._rating = rating;
    this._language = language;
    this._link = `https://www.tv-subs.com${link}.zip`;
    this._release = release;
  }

  get releaseName() {
    return this._release;
  }
  get language() {
    return this._language;
  }
  get rating() {
    return this._rating;
  }
  get link() {
    return this._link;
  }
}
