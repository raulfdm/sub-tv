const Season = require('./Season')
const link = '/tv/game-of-silence/season-1/'
const season = new Season(1, link)

describe('Season Class', () => {
  test('should return correct name', () => {
    expect(season.name).toBe('Season 1')
  })
  test('should return full URL', () => {
    expect(season.link).toBe('https://www.tv-subs.com' + link)
  })
})
