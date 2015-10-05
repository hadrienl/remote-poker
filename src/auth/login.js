import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Users} from '../api/users';

@inject(Router, Users)
export class Login {

  constructor (Router, Users) {
    this.Router = Router;
    this.Users = Users;
  }

  activate (routerParams) {
    this.backParam = routerParams.back;
  }

  submit () {
    this.Users.auth({
        username: this.username,
        password: this.password
      })
      .then(user => {
        try {
          this.Router.navigate(this.backParam);
        } catch (e) {
          console.log(e);
          this.Router.navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
        console.log('display an error');
        this.hasError = true;
      });
  }
}
