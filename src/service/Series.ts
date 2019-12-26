import axios from 'axios';
import { SeriesModel } from '../models/Series';

export class SeriesService {
  static async fetch(serieName = '""') {
    const url = `https://www.tv-subs.com/ajax_search.php?mov=${serieName}`;
    const foundSeries = await axios.get(url);

    return foundSeries.data.map((s: { tv: string; slug: string }) => new SeriesModel(s.tv, s.slug));
  }
}
