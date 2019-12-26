import axios from 'axios';
import { JSDOM } from 'jsdom';
import { SeasonModel } from '../models/Season';

function getSeasonHtmlElements(htmlText: string): Node[] {
  const dom = new JSDOM(htmlText);
  const elements = dom.window.document.querySelectorAll('[href*="season"]');

  return Array.from(elements);
}

function filterNonSeason(elementList: Node[]) {
  return elementList.filter(e => !/other/i.test(e.textContent || ''));
}

function convertHtmlToSeason(elementList: Node[]) {
  return elementList.map(el => {
    const name = el.textContent!;
    //@ts-ignore
    const link = el.href;
    return new SeasonModel(name, link);
  });
}

function fetch(serieName: string): Promise<SeasonModel[]> {
  const url = `https://www.tv-subs.com/tv/${serieName}`;

  return axios
    .get(url)
    .then(r => r.data)
    .then(getSeasonHtmlElements)
    .then(filterNonSeason)
    .then(convertHtmlToSeason);
}

export const SeasonService = {
  fetch,
};
