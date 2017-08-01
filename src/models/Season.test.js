const Season = require('./Season')
const name = 'Season 1'
const link = '/tv/game-of-silence/season-1/'
const season = new Season(name, link)

describe('Season Class', () => {
  test('should return correct name', () => {
    expect(season.name).toBe(name)
  })
  test('should return full URL', () => {
    expect(season.link).toBe('https://www.tv-subs.com' + link)
  })
})
