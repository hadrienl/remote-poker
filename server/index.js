var http = require('http'),
  WebSocketServer = require('websocket').server,
  server = http.createServer(function (request, response) {
    // TODO : serve the client
  }),
  wsserver = new WebSocketServer({
    httpServer: server
  });

server.listen(4321);

wsserver.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          // process WebSocket message
          if (message.utf8Data === 'kikoo') {
            connection.sendUTF(JSON.stringify( { type: 'kikoo', data: 'LOL'} ));
          }
      }
  });

  connection.on('close', function(connection) {
      // close user connection
      console.log('close');
  });
});
