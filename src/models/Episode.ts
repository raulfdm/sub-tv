export class EpisodeModel {
  private _link: string;
  constructor(private _name: string, link: string) {
    this._link = `https://www.tv-subs.com${link}`;
  }

  get name() {
    return `Episode ${this._name}`;
  }

  get link() {
    return this._link;
  }
}
