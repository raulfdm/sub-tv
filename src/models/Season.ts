// @ts-nocheck
export class Season {
  constructor(seasonNumber, link) {
    this._name = seasonNumber;
    this._link = `https://www.tv-subs.com${link}`;
  }

  get name() {
    return `Season ${this._name}`;
  }
  get link() {
    return this._link;
  }
}
