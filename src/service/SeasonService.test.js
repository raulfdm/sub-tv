/**
 * @jest-environment jsdom
 */

import mockedAxios from 'axios';
import { JSDOM } from 'jsdom';
import seasonPageContent from './__data__/seasonPage';
import { SeasonModel } from '../models';

import { fetchSeasonPage, handleHTML, createSeasonFromNodeElement } from './Season';

jest.mock('axios');

describe('fn: fetchSeasonPage', () => {
  const mockedHTML = `
  <div>
    <ul>
      <li>hue</li>
      < li>ahsuas</li>
      <li>br</li>
      <li>oi</li>
    </ul>
  </div>
  `;
  let result = undefined;

  beforeAll(async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: mockedHTML }));
    const markup = await fetchSeasonPage('black-lightning');
    result = JSDOM.fragment(markup);
  });

  it('should match snapshot', async () => {
    expect(result.querySelector('div')).toMatchSnapshot(mockedHTML);
  });
});

describe('fn: handleHTML', () => {
  const result = handleHTML(seasonPageContent);

  it('should return an array', () => {
    expect(result).toBeInstanceOf(Array);
  });

  it('should array has 7 elements (pre defined at dom structure)', () => {
    expect(result).toHaveLength(7);
  });

  it('should all elements contain "text" and "href"', () => {
    result.forEach(el => {
      expect(el).toHaveProperty('text');
      expect(el.text).not.toBeFalsy();

      expect(el).toHaveProperty('href');
      expect(el.href).not.toBeFalsy();
    });
  });
});

describe('fn: createSeasonFromNodeElement', () => {
  const handledHtml = [
    [
      { href: '/tv/game-of-thrones/season-1/', text: '1' },
      { href: '/tv/game-of-thrones/season-2/', text: '2' },
      { href: '/tv/game-of-thrones/season-3/', text: '3' },
      { href: '/tv/game-of-thrones/season-4/', text: '4' },
      { href: '/tv/game-of-thrones/season-5/', text: '5' },
      { href: '/tv/game-of-thrones/season-6/', text: '6' },
      { href: '/tv/game-of-thrones/season-7/', text: '7' },
    ],
    [
      { href: '/tv/mr-robot/season-1/', text: '1' },
      { href: '/tv/mr-robot/season-2/', text: '2' },
      { href: '/tv/mr-robot/season-3/', text: '3' },
    ],
  ];

  handledHtml.forEach((seasonPlainObjList, index) => {
    describe(`case ${index + 1}`, () => {
      const result = createSeasonFromNodeElement(seasonPlainObjList);
      it('should return an array', () => {
        expect(result).toBeInstanceOf(Array);
      });

      it('should array has the same length sent', () => {
        expect(result).toHaveLength(seasonPlainObjList.length);
      });

      it('should all elements be instanceof SeasonModel', () => {
        result.forEach(el => {
          expect(el).toBeInstanceOf(SeasonModel);
        });
      });
    });
  });
});
