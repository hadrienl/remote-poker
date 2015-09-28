import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
//import slug from 'slug';

@inject(Router)
export class Home {
  constructor (Router) {
    this.Router = Router;
  }

  displayRoomForm () {
    this.showCreateRoomForm = true;
  }

  createNewRoom (form) {
    //this.Router.navigate(slug(this.room.name));
    this.Router.navigate(this._slug(this.room.name));
  }

  _slug (str) {
    return str.replace(/[^a-zA-Z0-9]/g, '-');
  }
}
