const fetch = require('node-fetch')
const inquirer = require('inquirer')
const { JSDOM, } = require('jsdom')
const Episode = require('../models/Episode')

const fetchEpisodes = seasonURL => {
  return new Promise((resolve, reject) => {
    _searchEpisodes(seasonURL)
      .then(_handleHTML)
      .then(listOfEpisodes => resolve(listOfEpisodes))
      .catch(err => reject(err))
  })
}

const _searchEpisodes = url => {
  return fetch(url).then(res => res.text())
}

const _handleHTML = html => {
  const dom = new JSDOM(html)
  const listOfElements = dom.window.document.querySelectorAll(
    '.episode-list li'
  )
  const listOfEpisodes = []
  listOfElements.forEach(li => {
    listOfEpisodes.push(_mountEpisodeListFromLi(li))
  })
  return listOfEpisodes
}

const _mountEpisodeListFromLi = li => {
  const name = li.textContent
  const link = li.firstElementChild.href
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
