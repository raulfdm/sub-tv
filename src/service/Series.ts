import axios from 'axios';
import { Series } from '../models/Series';

export class SeriesService {
  static async fetch(serieName = '""') {
    const url = `https://www.tv-subs.com/ajax_search.php?mov=${serieName}`;
    const foundSeries = await axios.get(url);

    return foundSeries.data.map(s => new Series(s.tv, s.slug));
  }
}
