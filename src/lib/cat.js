export default class Cat {
  constructor() {
    this._sound = 'Meow';
    this._name = 'Cat';
  }
  get name() {
    return this._name;
  }
  get sound() {
    return this._sound;
  }
}
