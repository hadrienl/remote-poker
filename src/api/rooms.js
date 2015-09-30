import {inject} from 'aurelia-framework';
import {Api} from './api';

@inject(Api)
export class Rooms {
  constructor (Api) {
    this.Api = Api;
  }

  enter (id) {
    this.Api.request('room', 'enter', {
      id: id
    });
  }

  leave (id) {
    this.Api.request('room', 'leave', {
      id: id
    });
  }
}
