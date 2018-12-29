class Episode {
  constructor(name, link) {
    this._name = name;
    this._link = `https://www.tv-subs.com${link}`;
  }

  get name() {
    return `Episode ${this._name}`;
  }

  get link() {
    return this._link;
  }
}

module.exports = Episode;
