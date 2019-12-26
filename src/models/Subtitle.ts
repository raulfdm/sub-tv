export class SubtitleModel {
  private _link: string;

  constructor(private _rating: string, private _language: string, private _release: string, link) {
    this._link = `https://www.tv-subs.com${link}.zip`;
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
