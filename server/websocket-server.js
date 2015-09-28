module.exports = function (server) {
  var WebSocketServer = require('websocket').server,
    wsserver = new WebSocketServer({
      httpServer: server
    });

  wsserver.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // Test user authentification with request.cookies

    connection.on('message', function(message) {
      if (message.type === 'utf8') {
        switch (message.utf8Data) {
          case 'kikoo':
            connection.sendUTF(JSON.stringify( { type: 'kikoo', data: 'LOL'} ));
            break;
          default:
            connection.sendUTF('lol');
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
