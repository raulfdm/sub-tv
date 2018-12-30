import axios from 'axios';
import { JSDOM } from 'jsdom';

import { SeasonModel } from '../models';

const SEASON_END_POINT = 'https://www.tv-subs.com/tv/';

export const fetchSeasonPage = chosenSeriesName => {
  const url = SEASON_END_POINT + chosenSeriesName;
  return axios.get(url).then(res => res.data);
};

/* Todo: test */
export const filterElements = $el => {
  const TV_REGEX = /\/tv\//;
  const NUMBER_REGEX = /\d/;
  const outerHTML = $el.outerHTML;
  const innerText = $el.textContent;

  return TV_REGEX.test(outerHTML) && NUMBER_REGEX.test(innerText);
};

export const createSeasonFromNodeElement = (seasonElements = []) => {
  return seasonElements.map(({ text, href }) => new SeasonModel(text, href));
};

export const handleHTML = markup => {
  const dom = JSDOM.fragment(markup);
  const listOfLinks = Array.from(dom.querySelectorAll('a'));
  const filterSeasons = listOfLinks.filter(filterElements);

  return filterSeasons.map($el => {
    return {
      href: $el.href,
      text: $el.textContent,
    };
  });
};

export default {
  fetch: chosenSeriesName => {
    return fetchSeasonPage(chosenSeriesName)
      .then(handleHTML)
      .then(createSeasonFromNodeElement);
  },
};
