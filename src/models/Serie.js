class Serie {
  constructor(label, value) {
    this._label = label
    this._value = value
  }

  get label() {
    return this._label
  }
  get value() {
    return this._value
  }
}

module.exports = Serie
