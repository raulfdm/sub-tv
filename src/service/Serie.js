const inquirer = require('inquirer')
const fetch = require('node-fetch')
const Serie = require('../models/Serie')

const fetchSeries = serieName => {
  const url = `https://www.tv-subs.com/a_mov.php?reqmov=${serieName}`
  const series = _searchSeries(url)

  return series
    .then(series => series.movies.map(serie => new Serie(serie.label, serie.value)))
}

const _searchSeries = url => {
  return fetch(url)
    .then(res => res.json())
}

module.exports = {
  fetchSeries
}
