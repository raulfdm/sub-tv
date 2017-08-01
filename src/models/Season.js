class Season{
  constructor(season,link){
    this._name = season
    this._link = `https://www.tv-subs.com${link}`
  }

  get name(){
    return this._name
  }
  get link(){
    return this._link
  }
}

module.exports = Season
