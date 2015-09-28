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

  getCurrent() {
    return this.Api.request('user', 'current')
      .then(data => {
        this._current = new User(data);
        return this._current;
      });
  }
}
