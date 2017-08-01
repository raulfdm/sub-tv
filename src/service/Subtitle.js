const fetch = require('node-fetch')
const inquirer = require('inquirer')
const {
  JSDOM
} = require('jsdom')
const Subtitle = require('../models/Subtitle')
const SubtitleList = require('../models/SubtitleList')

const fetchSubtitles = seasonURL => {
  return new Promise((resolve, reject) => {
    _searchSubtitles(seasonURL)
      .then(_handleHTML)
      .then(listOfSubtitles => resolve(listOfSubtitles))
      .catch(err => reject(err))
  })
}

const _searchSubtitles = url => {
  return fetch(url)
    .then(res => res.text())
}

const _handleHTML = html => {
  const dom = new JSDOM(html)
  const listOfElements = dom.window.document.querySelectorAll('.tb-subtitle-list tbody tr')

  const listOfSubtitles = new SubtitleList()

  listOfElements.forEach(tr => {
    listOfSubtitles.add = _mountSubtitleListFromTr(tr)
  })

  return listOfSubtitles
}

const _mountSubtitleListFromTr = tr => {
  const rating = tr.childNodes[0].textContent
  const language = tr.childNodes[2].textContent
  const link = tr.childNodes[2].firstElementChild.href
  const name = tr.childNodes[3].textContent

  return new Subtitle(rating, language, name, link)
}

const subtitleLanguagePrompt = listOfSubtitleByLanguage => {
  const question = {
    choices: listOfSubtitleByLanguage,
    message: 'Choose the language',
    name: 'language',
    type: 'list'
  }

  return inquirer.prompt(question)
}

const subtitlePromp = listOfSubtitles => {
  const question = {
    choices: [],
    message: 'Choose the subtitle',
    name: 'choose',
    type: 'list',
    filter: function (answer) {
      return listOfSubtitles.find(
        subtitle => answer.replace(/Rating:\s\d\s\|\sName:\s/g, '') === subtitle.name
      )
    }
  }

  question.choices = listOfSubtitles.map(subtitle => `Rating: ${subtitle.rating} | Name: ${subtitle.name}`)

  return inquirer.prompt(question)
}

module.exports = {
  fetchSubtitles,
  subtitleLanguagePrompt,
  subtitlePromp
}
