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

        message = message.split(/\./);
        try {
          var serviceName = message[0];
          if (!serviceName.match(/^[a-z]+$/)) {
            throw new Error('Invalid service name');
          }
          var service = require('./services/' + serviceName);

          var methodName = message[1];
          if (!methodName.match(/^[a-zA-Z]+$/)) {
            throw new Error('Invalid method name');
          }
          service[methodName](data, connection, request, server);
        } catch (e) {
          connection.sendUTF('Method not found');
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
