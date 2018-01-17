const Episode = require('./Episode')
const link = '/tv/game-of-thrones/season-1/episode-1/'
const episode = new Episode(1, link)

describe('Episode Class', () => {
  test('should return correct name', () => {
    expect(episode.name).toBe('Episode 1')
  })
  test('should return full URL', () => {
    expect(episode.link).toBe('https://www.tv-subs.com' + link)
  })
})
