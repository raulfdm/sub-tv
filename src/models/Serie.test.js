const Serie = require('./Serie')
const label = 'Game of Silence 2016'
const value = 'game-of-silence'
const serie = new Serie(label, value)

describe('Serie Class', () => {
  test('should return correct name', () => {
    expect(serie.label).toBe(label)
  })
  test('should return full URL', () => {
    expect(serie.value).toBe(value)
  })
})
