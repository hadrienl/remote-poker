import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Rooms} from '../api/rooms';
import {Users} from '../api/users';
import {Stories} from '../api/stories';

@inject(Router, Rooms, Users, Stories)
export class Room {

  configureRouter(config, router) {
    config.map([{
      route: '',
      name: 'stories-list',
      moduleId: './stories-list'
    }, {
      route: '/play/:id',
      name: 'play story',
      moduleId: './play'
    }, {
      route: '/play',
      name: 'play',
      moduleId: './play'
    }]);
  }

  constructor (Router, Rooms, Users, Stories) {
    this.Router = Router;
    this.Rooms = Rooms;
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
        console.log(user);
        if (!user.scrummaster) {
          //this.Router.navigate(`/${params.room}/play`);
        }
      });

    // Room path
    this.room = params.room;

    this.Rooms.enter(this.room);
    console.log('activate');

    return userPromise;
  }

  deactivate () {
    this.Rooms.leave(this.room);
    console.log('deactivate');
  }
}
