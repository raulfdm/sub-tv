const inquirer = require('inquirer')

const seriesPrompt = (listOfSeries) => {
  const question = {
    choices: [],
    message: 'Escolha uma das opções abaixo',
    name: 'choice',
    type: 'list'
  }
  question.choices = listOfSeries.map(serie => serie.label)

  return inquirer.prompt(question)
}


module.exports = {
  seriesPrompt
}
