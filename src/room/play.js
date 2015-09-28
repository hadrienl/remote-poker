import {inject} from 'aurelia-framework';
import {Users} from '../api/users';
import {Stories} from '../api/stories';

@inject(Users, Stories)
export class Play {
  constructor (Users, Stories) {
    this.Users = Users;
    this.Stories = Stories;
  }

  activate(params, routeConfig, navigationInstruction) {
    // Check current user rights. If ID param is set and user is not scrummaster, redirect to /:room/play
    if (params.id &&
        !this.Users.current.scrummaster) {
      this.Router.navigate(`/${params.room}/play`);
    }

    this.id = params.id;

    // Load story
    if (this.id) {
      // Scrummaster mode
      return this.Stories.getById(this.id)
        .then(story => {
          this.story = story;
        });
    } else {
      // Player mode, we'll get the id from websocket
    }
  }
}
