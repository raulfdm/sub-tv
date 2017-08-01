const Subtitle = require('./Subtitle')
const rating = 0
const language = 'Arabic'
const name = '24.Legacy.S01E01.HDTV.x264-FLEET'
const link = '/subtitles/24-legacy-season-1-episode-1-arabic-30151'
const subtitle = new Subtitle(rating,language,name,link)

describe('Subtitle Class', () => {
  test('should return correct name', () => {
    expect(subtitle.name).toBe(name)
  })
  test('should return correct language', () => {
    expect(subtitle.language).toBe(language)
  })
  test('should return correct rating', () => {
    expect(subtitle.rating).toBe(rating)
  })
  test('should return full URL changing "/subtitles/" to "/subtitle/" and with .zip', () => {
    expect(subtitle.link).toBe('https://www.tv-subs.com/subtitle/24-legacy-season-1-episode-1-arabic-30151.zip')
  })
})
