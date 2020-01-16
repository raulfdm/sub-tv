import {
  SearchApiObject,
  SearchApiResponse,
  DetailsApiResponse,
  EpisodeApiObject,
  SubtitleApiResponse,
  SubtitleApiObject,
} from './types/api';

class State {
  private static instance: State;

  private moviesFromApi: SearchApiResponse = [];
  private availableSubtitles: SubtitleApiResponse = {};
  private selectedSubtitles: SubtitleApiObject[] = [];
  private languagesAvailable: string[] = [];
  private movieSelectedByUser?: SearchApiObject;
  private movieDetails?: DetailsApiResponse;
  public isSeries = false;
  public selectedSeason?: string;
  public selectedEpisode?: EpisodeApiObject;
  public selectedLanguage?: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  saveMovies(movies: SearchApiResponse): void {
    this.moviesFromApi = movies;
  }

  saveMovieDetails(movieDetails: DetailsApiResponse): void {
    this.isSeries = movieDetails.kind === 'tv series';
    this.movieDetails = movieDetails;
  }

  saveMovieSelectedByUser(movie: SearchApiObject): void {
    this.movieSelectedByUser = movie;
  }

  saveSelectedSeason(seasonNumber: string): void {
    this.selectedSeason = seasonNumber;
  }

  saveSelectedEpisode(episode: EpisodeApiObject): void {
    this.selectedEpisode = episode;
  }

  saveSelectedLanguage(lang: string): void {
    this.selectedLanguage = lang;
  }

  saveSubtitlesAndLanguages(subtitles: SubtitleApiResponse): void {
    this.availableSubtitles = subtitles;
    this.languagesAvailable = Object.keys(subtitles);
  }

  saveSelectSubtitltes(subtitles: SubtitleApiObject[]): void {
    this.selectedSubtitles = subtitles;
  }

  getSelectedSubtitles(): SubtitleApiObject[] {
    return [...this.selectedSubtitles];
  }

  getMovieByTitle(title: string): SearchApiObject {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.moviesFromApi.find(movie => movie.title === title)!;
  }

  getAvailableSubtitles(): SubtitleApiResponse {
    /* TODO: spread isn't deep clone */
    return { ...this.availableSubtitles };
  }

  getAvailableLanguages(): string[] {
    return [...this.languagesAvailable].sort();
  }

  getMovieDetails(): DetailsApiResponse | undefined {
    return this.movieDetails;
  }

  getSubtitlesByLanguage(lang: string): SubtitleApiObject[] {
    return this.availableSubtitles[lang];
  }

  get movieSelected(): SearchApiObject | undefined {
    return this.movieSelectedByUser;
  }

  static getInstance(): State {
    if (State.instance) {
      return State.instance;
    }
    State.instance = new State();

    return State.instance;
  }
}

export const state = State.getInstance();
