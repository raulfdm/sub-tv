const {
  JSDOM
} = require('jsdom')
const fetch = require('node-fetch')
const program = require('commander')
const inquirer = require('inquirer')

const {
  fetchSeries
} = require('./fetchSeries')
const {
  fetchSeason
} = require('./fetchSeason')

const {
  seriesPrompt
} = require('./service/Serie')



program.version('0.0.1')

const questions = [{
  message: 'Digite o nome da série',
  name: 'name',
  type: 'input',
  /* validate(input) {
    if (input.length < 3) {
      this._logs.error('\nNome precisa ter no mínimo 3 caracteres!')
    } else {
      return true
    }
  } ,
  filter(projectName) {
    return projectName
      .toLowerCase()
      .replace(/s/g, '-')
  },*/
}]
async function bootstrap() {

  const serie = await inquirer.prompt(questions)
  const listOfSeries = await fetchSeries(serie.name)

  const serieChose = await seriesPrompt(listOfSeries)


  /* .then(fetchSeries)
  .then(serieQuestion) */
  /* .then(fetchSeason)
  .then(seasonQuestion)
   */
  /* .catch((e) => {
    this._logs.errorTrace(e)
    process.exit()
  }) */


  /*
    const createSeasonQuestion = listOfSeason => {
      const question = {
        choices: [],
        message: 'Escolha uma das opções abaixo',
        name: 'choice',
        type: 'list'
      }
      question.choices = listOfSeason.map(season => season.season)

      return question
    }

    const seasonQuestion = list => inquirer.prompt(createSeasonQuestion(list))
   */
  }



  bootstrap()
  program.parse(process.argv)

  if (!process.argv.slice(1).length) {
    program.outputHelp()
  }
