const fetch = require('node-fetch');
const Series = require('../models/Series');

const fetchSeries = (seriesName = '""') => {
  const url = `https://www.tv-subs.com/ajax_search.php?mov=${seriesName}`;
  const series = _searchSeries(url);

  return series.then(series => {
    return series.map(s => new Series(s.tv, s.slug));
  });
};

const _searchSeries = url => {
  return fetch(url).then(res => res.json());
};

module.exports = {
  fetchSeries,
};
