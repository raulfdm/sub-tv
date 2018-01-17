const fetch = require('node-fetch')
const Serie = require('../models/Serie')

const fetchSeries = (serieName = '""') => {
  const url = `https://www.tv-subs.com/ajax_search.php?mov=${serieName}`
  const series = _searchSeries(url)

  return series.then(series => {
    return series.map(serie => new Serie(serie.tv, serie.slug))
  })
}

const _searchSeries = url => {
  return fetch(url).then(res => res.json())
}

module.exports = {
  fetchSeries,
}
