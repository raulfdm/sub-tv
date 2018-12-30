import random from 'lodash.random';

import { fetchSeriesByUserInput, filterUserAnswer } from './series';
import { SeriesModel } from '../models';

jest.mock('../service');
const { SeriesService: mockedSeriesService } = require('../service');

const mockData = [
  [new SeriesModel('game of throes', 'got')],
  [
    new SeriesModel('Super Nani', 'nani'),
    new SeriesModel('Marry Popins', 'marry_popins'),
    new SeriesModel('The Grench', 'grench'),
    new SeriesModel('Bonebeast', 'bonebeast'),
  ],
  [new SeriesModel('MR Robot', 'mr_robot'), new SeriesModel('Robotinic', 'robotinic')],
];

describe('fn: fetchSeriesByUserInput', () => {
  mockData.forEach((data, index) => {
    describe(`case ${index + 1}`, () => {
      const currentMock = mockData[index];
      let result = undefined;

      beforeAll(async () => {
        mockedSeriesService.default.fetch.mockImplementationOnce(() => data);
        result = await fetchSeriesByUserInput();
      });

      it('should return an array', async () => {
        expect(result).toBeInstanceOf(Array);
      });

      it('should result has the same length of the data sent', () => {
        expect(result).toHaveLength(currentMock.length);
      });

      it('should match all SeriesModel.label with the array content', () => {
        currentMock.forEach(cMock => {
          expect(result.includes(cMock.label)).toBeTruthy();
        });
      });
    });
  });
});

describe('fn: filterUserAnswer', () => {
  mockData.forEach((data, index) => {
    describe(`case ${index + 1}`, () => {
      const randomIndex = data.length === 1 ? 0 : random(0, data.length - 1);
      const answer = data[randomIndex].label;
      const result = filterUserAnswer(answer, data);

      it('should return an SeriesModel', () => {
        expect(result).toBeInstanceOf(SeriesModel);
      });

      it('should returned SeriesModel has label value equal the answer', () => {
        expect(result.label).toBe(answer);
      });

      /* TODO: test undefined case */
    });
  });
});
