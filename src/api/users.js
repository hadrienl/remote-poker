export class User {
  constructor (data = {}) {
    this.name = data.name;
    this.scrummaster = data.scrummaster;
  }
}

export class Users {
  get current () {
    if (!this._current) {
      let userData;
      try {
        userData = JSON.parse(localStorage.getItem('user'));
      } catch(e) {}
      this._current = new User(userData || undefined);
    }
    return this._current;
  }
}
