export default class Client {
  constructor(name = 'aName', clientID = 'anID') {
    this._name = name;
    this._clientID = clientID;
  }
  get name() {
    return this._name;
  }
  get clientID() {
    return this._clientID;
  }
}
