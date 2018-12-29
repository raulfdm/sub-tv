const Series = require('./Series');
const label = 'Game of Silence 2016';
const value = 'game-of-silence';
const series = new Series(label, value);

describe('Series Class', () => {
  test('should return correct name', () => {
    expect(series.label).toBe(label);
  });
  test('should return full URL', () => {
    expect(series.value).toBe(value);
  });
});
