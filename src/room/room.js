import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Users} from '../api/users';
import {Stories} from '../api/stories';

@inject(Router, Users, Stories)
export class Room {

  constructor (Router, Users, Stories) {
    this.Router = Router;
    this.Users = Users;
    this.Stories = Stories;
  }

  canActivate (params) {
    // test if this room exists
    if (params.room !== 'test') {
      return false;
    }
  }

  activate(params, routeConfig, navigationInstruction) {
    // Check current user rights. If user is not scrummaster, redirect to /:room/play
    let userPromise = this.Users.getCurrent()
      .then (user => {
        if (!user.scrummaster) {
          this.Router.navigate(`/${params.room}/play`);
        }
      });

    // Room path
    this.room = params.room;

    // Load stories
    let storiesPromise = this.Stories.getAll()
      .then(stories => {
        this.stories = stories;
        this._filterStories();
      });

    return Promise.all([userPromise, storiesPromise]);
  }

  _filterStories () {
    this.storiesToEstimate = this.stories.filter(story => story.estimation === null);
    this.storiesEstimated = this.stories.filter(story => story.estimation !== null);
  }
}
