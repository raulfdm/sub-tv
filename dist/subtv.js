#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var commander = _interopDefault(require('commander'));
var inquirer = _interopDefault(require('inquirer'));
var ora = _interopDefault(require('ora'));
var figlet = _interopDefault(require('figlet'));
var nodeFetch = _interopDefault(require('node-fetch'));
var jsdom = _interopDefault(require('jsdom'));
var lodash = _interopDefault(require('lodash.groupby'));
var lodash$1 = _interopDefault(require('lodash.reduce'));
var https = _interopDefault(require('https'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var decompress = _interopDefault(require('decompress'));
var inquirerAutocompletePrompt = _interopDefault(require('inquirer-autocomplete-prompt'));

class Season {
  constructor(seasonNumber, link) {
    this._name = seasonNumber;
    this._link = `https://www.tv-subs.com${link}`;
  }

  get name() {
    return `Season ${this._name}`;
  }
  get link() {
    return this._link;
  }
}

var Season_1 = Season;

const { JSDOM } = jsdom;



const fetchSeasons = serieName => {
  const url = `https://www.tv-subs.com/tv/${serieName}`;
  return new Promise((resolve, reject) => {
    _searchSeason(url)
      .then(_handleHTML)
      .then(listOfSeasons => resolve(listOfSeasons))
      .catch(err => reject(err));
  });
};

const _searchSeason = url => {
  return nodeFetch(url).then(res => res.text());
};

const _handleHTML = html => {
  const dom = new JSDOM(html);
  const listOfElements = dom.window.document.querySelectorAll('body > div:nth-child(5) > div.row.text-center > div a');

  const listOfSeasons = [];
  let season = {};

  listOfElements.forEach(seriesElement => {
    season = _mountSeasonFromLi(seriesElement);
    if (!/other/gi.test(season.name)) listOfSeasons.push(season);
  });

  return listOfSeasons;
};

const _mountSeasonFromLi = seriesElement => {
  const name = seriesElement.textContent;
  const link = seriesElement.href;
  return new Season_1(name, link);
};

const seasonPrompt = listOfSeason => {
  const question = {
    choices: [],
    message: 'Choose the season',
    name: 'season',
    type: 'list',
    filter: function(answer) {
      return listOfSeason.find(season => season.name === answer);
    },
  };
  question.choices = listOfSeason.map(series => series.name);

  return inquirer.prompt(question);
};

var Season_1$1 = {
  fetchSeasons,
  seasonPrompt,
};

class Episode {
  constructor(name, link) {
    this._name = name;
    this._link = `https://www.tv-subs.com${link}`;
  }

  get name() {
    return `Episode ${this._name}`;
  }

  get link() {
    return this._link;
  }
}

var Episode_1 = Episode;

const { JSDOM: JSDOM$1 } = jsdom;


const fetchEpisodes = seasonURL => {
  return _searchEpisodes(seasonURL)
    .then(_handleHTML$1)
    .catch(err => err);
};

const _searchEpisodes = url => {
  return nodeFetch(url).then(res => res.text());
};

const _handleHTML$1 = html => {
  const dom = new JSDOM$1(html);
  const listOfElements = dom.window.document.querySelectorAll('body > div:nth-child(5) > div:nth-child(5) > div a');

  return Array.from(listOfElements).map(episodeElement => _mountEpisodeListFromLi(episodeElement));
};

const _mountEpisodeListFromLi = episodeElement => {
  const name = episodeElement.textContent;
  const link = episodeElement.href;
  return new Episode_1(name, link);
};

const episodePrompt = listOfEpisodes => {
  const question = {
    choices: [],
    message: 'Choose the episode',
    name: 'episode',
    type: 'list',
    filter: function(answer) {
      return listOfEpisodes.find(episode => episode.name === answer);
    },
  };
  question.choices = listOfEpisodes.map(episode => episode.name);

  return inquirer.prompt(question);
};
var Episode_1$1 = {
  episodePrompt,
  fetchEpisodes,
};

class Series {
  constructor(label, value) {
    this._label = label;
    this._value = value;
  }

  get label() {
    return this._label;
  }
  get value() {
    return this._value;
  }
}

var Series_1 = Series;

const fetchSeries = (seriesName = '""') => {
  const url = `https://www.tv-subs.com/ajax_search.php?mov=${seriesName}`;
  const series = _searchSeries(url);

  return series.then(series => {
    return series.map(s => new Series_1(s.tv, s.slug));
  });
};

const _searchSeries = url => {
  return nodeFetch(url).then(res => res.json());
};

var Serie = {
  fetchSeries,
};

class Subtitle {
  constructor(rating, language, release, link) {
    this._rating = rating;
    this._language = language;
    this._link = `https://www.tv-subs.com${link}.zip`;
    this._release = release;
  }

  get releaseName() {
    return this._release;
  }
  get language() {
    return this._language;
  }
  get rating() {
    return this._rating;
  }
  get link() {
    return this._link;
  }
}

var Subtitle_1 = Subtitle;

class SubtitleList {
  constructor() {
    this._listOfSubtitles = [];
    this._listOfSubtitlesByLanguage;
  }

  get all() {
    return [].concat(this._listOfSubtitles);
  }
  set add(subtitle) {
    this._listOfSubtitles.push(subtitle);
    this._sortByLanguage();
  }

  get languagesAvailable() {
    return lodash$1(
      this._listOfSubtitlesByLanguage,
      (result, value, key) => {
        return result.concat(key);
      },
      []
    );
  }

  _sortByLanguage() {
    this._listOfSubtitlesByLanguage = lodash(this._listOfSubtitles, 'language');
  }

  getByLanguage(language) {
    return [].concat(this._listOfSubtitlesByLanguage[language]);
  }
}

var SubtitleList_1 = SubtitleList;

const { JSDOM: JSDOM$2 } = jsdom;



const fetchSubtitles = seasonURL => {
  return _searchSubtitles(seasonURL)
    .then(_handleHTML$2)
    .catch(err => err);
};

const _searchSubtitles = url => {
  return nodeFetch(url).then(res => res.text());
};

const _handleHTML$2 = html => {
  const dom = new JSDOM$2(html);
  const listOfElements = dom.window.document.querySelectorAll(
    'body > div:nth-child(5) > div:nth-child(7) > div > table > tbody tr'
  );

  const listOfSubtitles = new SubtitleList_1();

  listOfElements.forEach(tr => {
    listOfSubtitles.add = _mountSubtitleListFromTr(tr);
  });

  return listOfSubtitles;
};

const _mountSubtitleListFromTr = tr => {
  const rating = tr.querySelector('.rating-cell').textContent;
  const language = tr.querySelector('.flag-cell .sub-lang').textContent;
  const releaseName = tr.childNodes[2].textContent.replace(/subtitle/gi, '').trim();
  const link = tr.querySelector('.download-cell a').href.replace('subtitles', 'subtitle');

  return new Subtitle_1(rating, language, releaseName, link);
};

const subtitleLanguagePrompt = listOfSubtitleByLanguage => {
  const question = {
    choices: listOfSubtitleByLanguage,
    message: 'Choose the language',
    name: 'language',
    type: 'list',
  };

  return inquirer.prompt(question);
};

const subtitlePromp = listOfSubtitles => {
  const question = {
    choices: listOfSubtitles.map((subtitle, index) => ({
      name: `Rating: ${subtitle.rating} | Release: ${subtitle.releaseName}`,
      value: index,
    })),
    message: 'Choose the subtitle',
    name: 'choose',
    type: 'list',
    filter: indexSelected => listOfSubtitles[indexSelected],
  };

  return inquirer.prompt(question);
};

var Subtitle_1$1 = {
  fetchSubtitles,
  subtitleLanguagePrompt,
  subtitlePromp,
};

fetchSubtitles('https://www.tv-subs.com/tv/game-of-thrones/season-1/episode-5/'); /* ? */

const download = subtitle => {
  return new Promise((resolve, reject) => {
    const rootPath = process.cwd();
    const outPath = path.format({
      dir: rootPath,
      name: new Date().getTime(),
      ext: '.zip',
    });

    const subtitleFile = fs.createWriteStream(outPath);

    https.get(subtitle.link, response => {
      response.pipe(subtitleFile);

      subtitleFile
        .on('finish', () => {
          subtitleFile.close();
          _unzipDownload(outPath).then(() => {
            fs.unlinkSync(outPath);
            resolve(`Subtitle download successfully!\nCheck it in ${rootPath}`);
          });
        })
        .on('error', err => {
          fs.unlink(subtitle.name);
          reject(err);
        });
    });
  });
};

const _unzipDownload = outPath => {
  return decompress(outPath, process.cwd());
};

var Download = download;

const { fetchSeasons: fetchSeasons$1, seasonPrompt: seasonPrompt$1 } = Season_1$1;
const { fetchEpisodes: fetchEpisodes$1, episodePrompt: episodePrompt$1 } = Episode_1$1;
const { fetchSeries: fetchSeries$1 } = Serie;
const { fetchSubtitles: fetchSubtitles$1, subtitlePromp: subtitlePromp$1, subtitleLanguagePrompt: subtitleLanguagePrompt$1 } = Subtitle_1$1;



const packageJsonRoot = path.join(__dirname, '../package.json');
const currentVersion = require(packageJsonRoot).version;

commander.version(currentVersion);

const initialQuestion = () => {
  let series = [];
  return inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'chosen',
      message: 'Type serie name, then choose it',
      source: async function(answersSoFar, input) {
        series = await fetchSeries$1(input);
        return series.map(serie => serie.label);
      },
      filter: function(answer) {
        return series.find(serie => serie.label === answer);
      },
    },
  ]);
};

async function bootstrap() {
  const spinner = ora();
  console.log(figlet.textSync('Sub - TV'));
  inquirer.registerPrompt('autocomplete', inquirerAutocompletePrompt);

  try {
    const serie = await initialQuestion();

    spinner.start('Fetching available seasons');
    const listOfSeasons = await fetchSeasons$1(serie.chosen.value);
    spinner.stop('well Done');
    const seasonChosen = await seasonPrompt$1(listOfSeasons);

    spinner.start('Fetching available Episodes');
    const listOfEpisodes = await fetchEpisodes$1(seasonChosen.season.link);
    spinner.stop('well Done');

    const episodeChosen = await episodePrompt$1(listOfEpisodes);

    spinner.start('Fetching available subtitles');
    const listOfSubtitles = await fetchSubtitles$1(episodeChosen.episode.link);
    spinner.stop('well Done');

    const languageChosen = await subtitleLanguagePrompt$1(listOfSubtitles.languagesAvailable);
    const subtitlesByLanguage = listOfSubtitles.getByLanguage(languageChosen.language);
    const subtitleChosen = await subtitlePromp$1(subtitlesByLanguage);

    spinner.start('Fetching your subtitle! It could take a while!');
    const result = await Download(subtitleChosen.choose);
    spinner.succeed(result);
  } catch (error) {
    spinner.fail('Sorry, It was not possible to download your subtitle');

    console.trace(error);
  }
}

bootstrap();
commander.parse(process.argv);

if (!process.argv.slice(1).length) {
  commander.outputHelp();
}

var src = {

};

module.exports = src;
