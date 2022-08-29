export class Movie {
  private _kind?: string;
  private _title?: string;
  /* TODO: FIX ANY */
  private _seasons: any;

  constructor(private _imdbId: string) {}

  get id() {
    return this._imdbId;
  }

  get kind() {
    return this._kind;
  }
  get title() {
    return this._title;
  }

  get seasons() {
    return { ...this._seasons };
  }

  set details(movieDetails: any) {
    this._kind = movieDetails.kind;
    this._title = movieDetails.title;
  }

  set seasons(seasonList: string[]) {
    this._seasons = seasonList.reduce((result: any, current) => {
      result[
        current
      ] = `https://www.imdb.com/title/tt0944947/episodes?season=${current}`;

      return result;
    }, {});
  }

  get apiResponse() {
    return {
      id: this.id,
      title: this.title,
      kind: this.kind,
      seasons: this.seasons
    };
  }
}
