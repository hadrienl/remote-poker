import {inject} from 'aurelia-framework';
import {Api} from '../api/api';

const SESSION_COOKIE_NAME = 'tmp-auth-remote-poker';

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
    return new Promise((resolve, reject) => {
      if (this._current) {
        resolve(this._current);
        return;
      }
      this.Api.request('user', 'current')
        .then(data => {
          this._current = new User(data);
          resolve(this._current);
        })
        .catch(err => reject(err));
    });
  }

  auth ({username, password}) {
    return this.Api.request('user', 'auth', {
        username: username,
        password: password
      })
      .then(data => {
        this._current = data.user;
        document.cookie = `${data.cookie.name}=${data.cookie.value}`;
        return this._current;
      });
  }
}
