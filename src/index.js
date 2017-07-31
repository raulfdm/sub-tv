const {
  JSDOM
} = require('jsdom')
const fetch = require('node-fetch')
const program = require('commander')
const inquirer = require('inquirer')

const {
  fetchSeries
} = require('./service/Serie')
const {
  fetchSeasons,
  seasonPrompt,
} = require('./service/Season')
const {
  fetchEpisodes,
  episodePrompt,
} = require('./service/Episode')
const {
  fetchSubtitles,
  subtitlePromp,
  subtitleLanguagePrompt,
} = require('./service/Subtitle')

const download = require('./service/Download')


program.version('0.0.1')

const initialQuestion = () => {
  let series = []
  return inquirer.prompt([{
    type: 'autocomplete',
    name: 'chosen',
    message: 'Digite e selecione o nome da série',
    source: async function (answersSoFar, input) {
      series = await fetchSeries(input)
      return series.map(serie => serie.label)
    },
    filter: function (answer) {
      return series.find(serie => serie.label === answer)
    }
  }])
}


async function bootstrap() {
  inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

  try {
    const serie = await initialQuestion()

    const listOfSeasons = await fetchSeasons(serie.chosen.value)
    const seasonChosen = await seasonPrompt(listOfSeasons)

    const listOfEpisodes = await fetchEpisodes(seasonChosen.season.href)
    const episodeChosen = await episodePrompt(listOfEpisodes)

    const listOfSubtitles = await fetchSubtitles(episodeChosen.episode.link)
    const languageChosen = await subtitleLanguagePrompt(listOfSubtitles.languagesAvailable)
    const subtitlesByLanguage = listOfSubtitles.getByLanguage(languageChosen.language)
    const subtitleChosen = await subtitlePromp(subtitlesByLanguage)
    const result = await download(subtitleChosen.choose)

    console.log(result)

  } catch (error) {
    console.trace(error)
  }

}

bootstrap()
program.parse(process.argv)

if (!process.argv.slice(1).length) {
  program.outputHelp()
}
