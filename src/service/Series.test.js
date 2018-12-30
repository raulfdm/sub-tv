import mockAxios from 'axios';

import fakeDataList from './__data__/series.model.response';
import SeriesService, { getSeriesUrl, SEARCH_END_POINT_URL } from './Series';
import Series from '../models/Series';

describe('SeriesService', () => {
  fakeDataList.forEach((fakeData, index) => {
    describe(`case ${index + 1}`, () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: fakeData }));
      let result = undefined;

      beforeAll(async () => {
        result = await SeriesService.fetch('game');
      });

      it('should return an array', () => {
        expect(result).toBeInstanceOf(Array);
      });

      it(`should the array has only ${fakeData.length} elements`, () => {
        expect(result).toHaveLength(fakeData.length);
      });

      it('should all elements inside the array be instance of "Series" model', () => {
        result.forEach(res => expect(res).toBeInstanceOf(Series));
      });
    });
  });
});

describe('fn: getSeriesUrl', () => {
  it('should return an object instance of URL', () => {
    expect(getSeriesUrl('game')).toBeInstanceOf(URL);
  });

  it('should url be the same as the end point url const', () => {
    const { origin, pathname } = getSeriesUrl('game');
    expect(origin + pathname).toBe(SEARCH_END_POINT_URL);
  });

  it('should has double quotes as default name', () => {
    expect(getSeriesUrl().href).toBe('https://www.tv-subs.com/ajax_search.php?mov=%22%22');
  });

  it('should add sent name as param', () => {
    expect(getSeriesUrl('game').href).toBe('https://www.tv-subs.com/ajax_search.php?mov=game');
  });

  it('should add sent name as param (case 2)', () => {
    expect(getSeriesUrl('mr robot').href).toBe('https://www.tv-subs.com/ajax_search.php?mov=mr+robot');
  });
});
