const fetch = require('node-fetch')
const Serie = require('./models/Serie')
const inquirer = require('inquirer')

const fetchSeries = name => {
  const url = `https://www.tv-subs.com/a_mov.php?reqmov=${name}`
  const series = searchSeries(url)

  return series
    .then(series => series.movies.map(serie => new Serie(serie.label, serie.value)))
}

const searchSeries = url => {
  return fetch(url)
    .then(res => res.json())
}

module.exports = {
  fetchSeries
}
