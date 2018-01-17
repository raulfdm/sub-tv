const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const Season = require('../models/Season')
const inquirer = require('inquirer')

const fetchSeasons = serieName => {
  const url = `https://www.tv-subs.com/tv/${serieName}`
  return new Promise((resolve, reject) => {
    _searchSeason(url)
      .then(_handleHTML)
      .then(listOfSeasons => resolve(listOfSeasons))
      .catch(err => reject(err))
  })
}

const _searchSeason = url => {
  return fetch(url).then(res => res.text())
}

const _handleHTML = html => {
  const dom = new JSDOM(html)
  const listOfElements = dom.window.document.querySelectorAll(
    'body > div:nth-child(5) > div.row.text-center > div a',
  )

  const listOfSeasons = []
  let season = {}

  listOfElements.forEach(serieElement => {
    season = _mountSeasonFromLi(serieElement)
    if (!/other/gi.test(season.name)) listOfSeasons.push(season)
  })

  return listOfSeasons
}

const _mountSeasonFromLi = serieElement => {
  const name = serieElement.textContent
  const link = serieElement.href
  return new Season(name, link)
}

const seasonPrompt = listOfSeason => {
  const question = {
    choices: [],
    message: 'Choose the season',
    name: 'season',
    type: 'list',
    filter: function(answer) {
      return listOfSeason.find(season => season.name === answer)
    },
  }
  question.choices = listOfSeason.map(serie => serie.name)

  return inquirer.prompt(question)
}

module.exports = {
  fetchSeasons,
  seasonPrompt,
}

fetchSeasons('game-of-silence') /* ? */
