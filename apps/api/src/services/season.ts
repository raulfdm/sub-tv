import axios from "axios";
import { JSDOM } from "jsdom";

function getSeasonHtmlElements(htmlText: string): Node[] {
  const dom = new JSDOM(htmlText);
  const elements = dom.window.document.querySelectorAll('[href*="season"]');

  return Array.from(elements);
}

function convertHtmlToSeason(elementList: Node[]) {
  return elementList.map(el => {
    const name = el.textContent!;
    return name;
  });
}

export function fetchSeason(imdbId: string): Promise<string[]> {
  const url = `https://www.imdb.com/title/tt${imdbId}`;

  return axios
    .get(url)
    .then(r => r.data)
    .then(getSeasonHtmlElements)
    .then(convertHtmlToSeason);
}
