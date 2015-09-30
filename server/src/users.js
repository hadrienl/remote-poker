var _ = require('lodash');

var users = [{
  id: 1,
  name: 'Hadrien',
  username: 'hadrien',
  password: 'azerty',
  scrummaster: true
}, {
  id: 2,
  name: 'Maurice',
  username: 'maurice',
  password: 'moss',
  scrummaster: false
}];

function Users () {}
Users.prototype = {
  getByUsername: function (username) {
    return _.find(users, { username: username});
  }
};

module.exports = new Users();
