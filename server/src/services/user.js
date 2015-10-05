var Users = require('../data/users'),
  _ = require('lodash');

const SESSION_COOKIE_NAME = 'tmp-auth-remote-poker';

class User {
  current (data, connection, request, server) {

    connection.user = this._getUserFromSession(request.cookies);

    if (connection.user) {
      connection.sendUTF(JSON.stringify({ type: 'user.current', data: connection.user }));
    } else {
      connection.sendUTF(JSON.stringify({ type: 'user.current', error: 'not found' }));
    }
  }

  auth (data, connection, request, server) {
    connection.user = Users.getByUsernameAndPassword(data.username, data.password);
    if (connection.user) {
      request.cookies.push({
        name: SESSION_COOKIE_NAME,
        value: connection.user.id
      });
      connection.sendUTF(JSON.stringify({
        type: 'user.auth',
        data: {
          user: connection.user,
          cookie: {
            name: 'tmp-auth-remote-poker',
            value: connection.user.id
          }
        }
      }));
    } else {
      connection.sendUTF(JSON.stringify({ type: 'user.auth', error: 'not found' }));
    }
  }

  _getUserFromSession (cookies) {
    let sessionCookie = _.findWhere(cookies, { name: SESSION_COOKIE_NAME });
    if (sessionCookie) {
      return Users.getById(sessionCookie.value);
    }
    return null;
  }
}

module.exports = new User();
