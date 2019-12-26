import uniq from 'lodash/uniq';

import { SubtitleModel } from '.';

export class SubtitleListModel {
  constructor(private _subtitles: SubtitleModel[]) {}

  get all() {
    return [...this._subtitles];
  }

  get availableLanguages() {
    const languages = this._subtitles.map(sub => sub.language);
    return uniq(languages);
  }

  getSubtitlesByLanguage(language: string) {
    return this._subtitles.filter(sub => sub.language === language);
  }
}
