class Season{
  constructor(season,href){
    this._season = season
    this._href = `https://www.tv-subs.com/${href}`
  }

  get season(){
    return this._season
  }
  get href(){
    return this._href
  }
}

module.exports = Season
