'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var User = (function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'current',
    value: function current(data, connection, request, server) {
      if (connection.user) {
        connection.sendUTF(JSON.stringify({ type: 'user.current', data: user }));
      } else {
        connection.sendUTF(JSON.stringify({ type: 'user.current', error: 'not found' }));
      }
    }
  }, {
    key: 'auth',
    value: function auth(data, connection, request, server) {
      connection.user = Users.getByUsername(data.username);
      if (user) {
        connection.sendUTF(JSON.stringify({ type: 'user.auth', data: user }));
      } else {
        connection.sendUTF(JSON.stringify({ type: 'user.auth', error: 'not found' }));
      }
    }
  }]);

  return User;
})();

module.exports = new User();