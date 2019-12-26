import fetch from 'node-fetch';
import inquirer from 'inquirer';
import { JSDOM } from 'jsdom';
import { Subtitle } from '../models/Subtitle';
import { SubtitleList } from '../models/SubtitleList';

export const fetchSubtitles = seasonURL => {
  return _searchSubtitles(seasonURL)
    .then(_handleHTML)
    .catch(err => err);
};

const _searchSubtitles = url => {
  return fetch(url).then(res => res.text());
};

const _handleHTML = html => {
  const dom = new JSDOM(html);
  const listOfElements = dom.window.document.querySelectorAll(
    'body > div:nth-child(5) > div:nth-child(7) > div > table > tbody tr',
  );

  const listOfSubtitles = new SubtitleList();

  listOfElements.forEach(tr => {
    listOfSubtitles.add = _mountSubtitleListFromTr(tr);
  });

  return listOfSubtitles;
};

const _mountSubtitleListFromTr = tr => {
  const rating = tr.querySelector('.rating-cell').textContent;
  const language = tr.querySelector('.flag-cell .sub-lang').textContent;
  const releaseName = tr.childNodes[2].textContent.replace(/subtitle/gi, '').trim();
  const link = tr.querySelector('.download-cell a').href.replace('subtitles', 'subtitle');

  return new Subtitle(rating, language, releaseName, link);
};

export const subtitleLanguagePrompt = listOfSubtitleByLanguage => {
  const question = {
    choices: listOfSubtitleByLanguage,
    message: 'Choose the language',
    name: 'language',
    type: 'list',
  };

  // @ts-ignore
  return inquirer.prompt(question);
};

export const subtitlePromp = listOfSubtitles => {
  const question = {
    choices: listOfSubtitles.map((subtitle, index) => ({
      name: `Rating: ${subtitle.rating} | Release: ${subtitle.releaseName}`,
      value: index,
    })),
    message: 'Choose the subtitle',
    name: 'choose',
    type: 'list',
    filter: indexSelected => listOfSubtitles[indexSelected],
  };

  // @ts-ignore
  return inquirer.prompt(question);
};
