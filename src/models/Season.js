class Season{
  constructor(season,href){
    this._name = season
    this._href = `https://www.tv-subs.com/${href}`
  }

  get name(){
    return this._name
  }
  get href(){
    return this._href
  }
}

module.exports = Season
