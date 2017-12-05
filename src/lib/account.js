export default class Account {
  constructor(name, accountID) {
    this._name = name;
    this._accountID = accountID;
  }
  get name() {
    return this._name;
  }
  get accountID() {
    return this._accountID;
  }
}
