class User {
  current (data, connection, request, server) {
    if (connection.user) {
      connection.sendUTF(JSON.stringify({ type: 'user.current', data: user }));
    } else {
      connection.sendUTF(JSON.stringify({ type: 'user.current', error: 'not found' }));
    }
  }

  auth (data, connection, request, server) {
    connection.user = Users.getByUsername(data.username);
    if (user) {
      connection.sendUTF(JSON.stringify({ type: 'user.auth', data: user }));
    } else {
      connection.sendUTF(JSON.stringify({ type: 'user.auth', error: 'not found' }));
    }
  }
}

module.exports = new User();
