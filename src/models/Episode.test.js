const Episode = require('./Episode')
const name = 'Episode 1'
const link = '/tv/game-of-thrones/season-1/episode-1/'
const episode = new Episode(name, link)

describe('Episode Class', () => {
  test('should return correct name', () => {
    expect(episode.name).toBe(name)
  })
  test('should return full URL', () => {
    expect(episode.link).toBe('https://www.tv-subs.com' + link)
  })
})
