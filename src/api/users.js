import {inject} from 'aurelia-framework';
import {Api} from '../api/api';

export class User {
  constructor (data = {}) {
    this.name = data.name;
    this.scrummaster = data.scrummaster;
  }
}

@inject(Api)
export class Users {
  constructor (Api) {
    this.Api = Api;
  }

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
