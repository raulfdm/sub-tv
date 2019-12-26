import axios from 'axios';
import { JSDOM } from 'jsdom';
import { EpisodeModel } from '../models';

function getSeasonHtmlElements(htmlText: string): Node[] {
  const dom = new JSDOM(htmlText);
  const elements = dom.window.document.querySelectorAll(
    '.btn-group [href*="season"][href*="episode"]',
  );

  return Array.from(elements);
}

function convertHtmlToEpisodes(elementList: Node[]) {
  return elementList.map(el => {
    const name = el.textContent!;
    //@ts-ignore
    const link = el.href;
    return new EpisodeModel(name, link);
  });
}

function fetch(seasonLink: string) {
  return axios
    .get(seasonLink)
    .then(r => r.data)
    .then(getSeasonHtmlElements)
    .then(convertHtmlToEpisodes);
}

export const EpisodeService = {
  fetch,
};
