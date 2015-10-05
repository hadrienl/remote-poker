var _ = require('lodash'),
  sha1 = require('sha1');

var users = [{
  id: 1,
  name: 'Hadrien',
  username: 'hadrien',
  password: '9cf95dacd226dcf43da376cdb6cbba7035218921',//'azerty',
  scrummaster: true
}, {
  id: 2,
  name: 'Maurice',
  username: 'maurice',
  password: '0de4b80a5f67aec20b0514043ca79a43d085b59f', //'moss'
  scrummaster: false
}];

class Users {
  getByUsername (username) {
    return _.find(users, { username: username});
  }

  getByUsernameAndPassword (username = '', password = '') {
    return _.find(users, {
      username: username,
      password: sha1(password)
    });
  }

  getById (id) {
    return _.find(users, { id: +id });
  }
}

module.exports = new Users();
