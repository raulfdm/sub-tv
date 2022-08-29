// @ts-ignore
import OS from "opensubtitles-api";

let isExpired = false;
let instance: Promise<OpenSubtitleService>;

/* TODO: Refactor this method to use TS singleton */
class OpenSubtitleService {
  constructor(private token: string, private openSubtitlesInstance: OS) {}

  search(...args: any) {
    return this.openSubtitlesInstance.search(...args);
  }

  async searchMoviesOnIMDB(movieName: string) {
    const result = await this.openSubtitlesInstance.api.SearchMoviesOnIMDB(
      this.token,
      movieName
    );

    if (!result.data) {
      console.log("result", result);
      throw new Error("Cannot rich API");
    }

    return result.data || [];
  }

  async searchSubtitle(imdbid: string, season?: string, episode?: string) {
    const result = await this.openSubtitlesInstance.api.SearchSubtitles(
      this.token,
      [
        {
          imdbid,
          season,
          episode
        }
      ]
    );

    return result.data || [];
  }

  async getMovieDetails(imdbId: string) {
    /* TODO: Implement a workaround of issues like: 10090796 */
    const result = await this.openSubtitlesInstance.api.GetIMDBMovieDetails(
      this.token,
      imdbId
    );

    if (result.status.includes("408")) {
      return Promise.reject(`Movie/serie (imbd id: ${imdbId}) not found`);
    }

    return result.data;
  }

  static async create() {
    const OpenSubtitles = new OS({
      useragent: process.env.OPEN_SUB_USER_AGENT,
      username: process.env.OPEN_SUB_USERNAME,
      password: process.env.OPEN_SUB_PASSWORD,
      ssl: true
    });

    const { token } = await OpenSubtitles.login();

    return new OpenSubtitleService(token, OpenSubtitles);
  }

  static get instance() {
    if (isExpired || instance === undefined) {
      instance = OpenSubtitleService.create();
      isExpired = false;
    }

    return instance;
  }

  async wakeUp() {
    const result = await this.openSubtitlesInstance.api.NoOperation(this.token);
    console.log(result);
  }

  resetTokens() {
    isExpired = true;
    return OpenSubtitleService.instance;
  }
}

const OpenSubtitles = OpenSubtitleService.instance;

export { OpenSubtitles };
