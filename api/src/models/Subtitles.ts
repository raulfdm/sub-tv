import { pick, groupBy } from "lodash";

import { SubtitleApiResponse, NormalizedSubtitle } from "../types";

export class Subtitles {
  static filterFields(sub: SubtitleApiResponse): NormalizedSubtitle {
    const desiredData = pick(sub, [
      "ISO639", // "es","en","pt"
      "SubFileName",
      "IDSubtitleFile",
      "ZipDownloadLink",
      "LanguageName"
    ]);

    return {
      id: desiredData.IDSubtitleFile,
      language: desiredData.LanguageName,
      languageISO: desiredData.ISO639,
      fileName: desiredData.SubFileName,
      zipLink: desiredData.ZipDownloadLink
    };
  }

  static groupByLanguage(subtitleList: NormalizedSubtitle[]) {
    return groupBy(subtitleList, "language");
  }

  static fromApi(hugeList: SubtitleApiResponse[]) {
    const normalizedSubtitles = hugeList.map(this.filterFields);
    const subtitlesByLanguage = this.groupByLanguage(normalizedSubtitles);

    return subtitlesByLanguage;
  }
}
