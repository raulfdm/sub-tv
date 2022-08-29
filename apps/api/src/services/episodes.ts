import axios from "axios";
import { JSDOM } from "jsdom";
// import { EpisodeModel } from '../models';

function getSeasonHtmlElements(htmlText: string): HTMLAnchorElement[] {
  const dom = new JSDOM(htmlText);
  const elements = dom.window.document.querySelectorAll(
    ".eplist .image a[href*=ep]"
  ) as NodeListOf<HTMLAnchorElement>;

  return Array.from(elements);
}

function convertHtmlToEpisodes(elementList: HTMLAnchorElement[]) {
  return elementList.map((el, index) => {
    const link = el.href;
    const title = el.title;
    return {
      /* TODO: Error prone. Maybe get it from LINK */
      epNumber: index + 1,
      /* TODO: be aware about this link */
      link: `https://www.imdb.com${link}`,
      title
    };
  });
}

export function fetchEpisodes(imdbId: string, seasonNumber: string) {
  const url = `https://www.imdb.com/title/tt${imdbId}/episodes?season=${seasonNumber}`;

  console.log(url);

  return axios
    .get(url)
    .then(r => r.data)
    .then(getSeasonHtmlElements)
    .then(convertHtmlToEpisodes);
}
