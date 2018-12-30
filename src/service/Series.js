import axios from 'axios';
import SeriesModel from '../models/Series';

export const SEARCH_END_POINT_URL = 'https://www.tv-subs.com/ajax_search.php';

export const getSeriesUrl = (seriesName = `""`) => {
  const seriesURL = new URL(SEARCH_END_POINT_URL);
  const SEARCH_PARAM = 'mov';

  seriesURL.searchParams.set(SEARCH_PARAM, seriesName);

  return seriesURL;
};

export default {
  fetch: name =>
    axios
      .get(getSeriesUrl(name).href)
      .then(res => res.data)
      .then(seriesList => {
        return seriesList.map(currentSeries => new SeriesModel(currentSeries.tv, currentSeries.slug));
      }),
};
