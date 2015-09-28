var Users = require('./users');

module.exports = function (server) {
  var WebSocketServer = require('websocket').server,
    wsserver = new WebSocketServer({
      httpServer: server
    });

  wsserver.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // Test user authentification with request.cookies
    var user;

    connection.on('message', function(message) {
      if (message.type === 'utf8') {
        var type, data;
        try {
          message = JSON.parse(message.utf8Data);
          data = message.data;
          message = message.message;
        } catch (e) {
          message = message.utf8Data;
        }

        switch (message) {
          case 'user.current':
            if (user) {
              connection.sendUTF(JSON.stringify({ type: 'user.current', data: user }));
            } else {
              connection.sendUTF(JSON.stringify({ type: 'user.current', error: 'not found' }));
            }
            break;

          case 'user.auth':
            user = Users.getByUsername(data.username);
            console.log(user);
            if (user) {
              connection.sendUTF(JSON.stringify({ type: 'user.auth', data: user }));
            } else {
              connection.sendUTF(JSON.stringify({ type: 'user.auth', error: 'not found' }));
            }
            break;

          default:
            connection.sendUTF('');
        }
      }
    });

    connection.on('close', function(connection) {
      // close user connection
      console.log('close');
    });
  });

  var host = server.address().address,
    port = server.address().port;
  console.log('WebSocket Server listening on http://%s:%s', host, port);
};
