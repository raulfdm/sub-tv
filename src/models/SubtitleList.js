import _ from 'lodash';

export class SubtitleList {
  constructor() {
    this._listOfSubtitles = [];
    this._listOfSubtitlesByLanguage;
  }

  get all() {
    return [].concat(this._listOfSubtitles);
  }
  set add(subtitle) {
    this._listOfSubtitles.push(subtitle);
    this._sortByLanguage();
  }

  get languagesAvailable() {
    return _.reduce(
      this._listOfSubtitlesByLanguage,
      (result, value, key) => {
        return result.concat(key);
      },
      [],
    );
  }

  _sortByLanguage() {
    this._listOfSubtitlesByLanguage = _.groupBy(this._listOfSubtitles, 'language');
  }

  getByLanguage(language) {
    return [].concat(this._listOfSubtitlesByLanguage[language]);
  }
}
