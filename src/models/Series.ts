export class Series {
  constructor(private _label: string, private _value: string) {}

  get label() {
    return this._label;
  }
  get value() {
    return this._value;
  }
}
