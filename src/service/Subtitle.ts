import axios from 'axios';
import { JSDOM } from 'jsdom';
import { SubtitleModel, SubtitleListModel } from '../models';

function getSeasonHtmlElements(htmlText: string): HTMLTableRowElement[] {
  const dom = new JSDOM(htmlText);
  const elements = dom.window.document.querySelectorAll(
    '[href*="subtitles"]:not(.subtitle-download)',
  );

  /* All subtitles are based on a table and each has a bunch of useful info */
  return Array.from(elements).map(e => e.closest('tr')!);
}

function convertHtmlToSubtitle(elementList: HTMLTableRowElement[]) {
  return elementList.map(subtitleTr => {
    const rating = subtitleTr.querySelector('.rating-cell')!.textContent;
    const language = subtitleTr.querySelector('.flag-cell .sub-lang')!.textContent;
    const releaseName = subtitleTr.childNodes[2].textContent!.replace(/subtitle/gi, '').trim();
    const link = subtitleTr
      .querySelector('.download-cell a')!
      // @ts-ignore
      .href.replace('subtitles', 'subtitle');

    /* TODO: validate here */
    // @ts-ignore
    return new SubtitleModel(rating, language, releaseName, link);
  });
}

function fetch(episodeLink: string) {
  return axios
    .get(episodeLink)
    .then(r => r.data)
    .then(getSeasonHtmlElements)
    .then(convertHtmlToSubtitle)
    .then(subtitles => new SubtitleListModel(subtitles));
}

export const SubtitleService = {
  fetch,
};
