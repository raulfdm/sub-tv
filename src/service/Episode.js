const fetch = require('node-fetch')
const inquirer = require('inquirer')
const { JSDOM } = require('jsdom')
const Episode = require('../models/Episode')

const fetchEpisodes = seasonURL => {
  return _searchEpisodes(seasonURL)
    .then(_handleHTML)
    .catch(err => err)
}

const _searchEpisodes = url => {
  return fetch(url).then(res => res.text())
}

const _handleHTML = html => {
  const dom = new JSDOM(html)
  const listOfElements = dom.window.document.querySelectorAll(
    'body > div:nth-child(5) > div:nth-child(5) > div a',
  )

  return Array.from(listOfElements).map(episodeElement => _mountEpisodeListFromLi(episodeElement))
}

const _mountEpisodeListFromLi = episodeElement => {
  const name = episodeElement.textContent
  const link = episodeElement.href
  return new Episode(name, link)
}

const episodePrompt = listOfEpisodes => {
  const question = {
    choices: [],
    message: 'Choose the episode',
    name: 'episode',
    type: 'list',
    filter: function(answer) {
      return listOfEpisodes.find(episode => episode.name === answer)
    },
  }
  question.choices = listOfEpisodes.map(episode => episode.name)

  return inquirer.prompt(question)
}
module.exports = {
  episodePrompt,
  fetchEpisodes,
}

