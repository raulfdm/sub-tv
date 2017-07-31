const fetch = require('node-fetch')
const {
  JSDOM
} = require('jsdom')

const Season = require('../models/Season')

const fetchSeason = serieName => {
  const url = `https://www.tv-subs.com/tv/${serieName}`
  return new Promise((resolve, reject) => {
    searchSeason(url)
      .then(handleHTML)
      .then(listOfSeason => resolve(listOfSeason))
  })
}

const searchSeason = url => {
  console.log(url)
  return fetch(url)
    .then(res => res.text())
}

const handleHTML = html => {
  const dom = new JSDOM(html)
  const listOfElements = dom.window.document.querySelectorAll(
    '.season-list li')
  const listOfSeason = []
  let newLi = {}
  listOfElements.forEach(li => {
    newLi = mountSeasonFromLi(li)
    if (newLi.season.toLowerCase() !== 'other')
      listOfSeason.push(newLi)
  })

  return listOfSeason
}

const mountSeasonFromLi = li => {
  const name = li.textContent
  const link = li.firstElementChild.href
  return new Season(name, link)
}

module.exports = {
  fetchSeason
}
