module.exports = function (config) {
  var express = require('express');
  var app = express();
  app.get('/', function (req, res) {
    res.send('Hello World!<script>var a = new WebSocket("ws://localhost:4321"); a.onopen = function () {a.onmessage = function(message) {console.log(message)};a.send("kikoo")}</script>');
  });
  var server = app.listen(config.port, function () {
    var host = server.address().address,
      port = server.address().port;

    console.log('Web Server listening on http://%s:%s', host, port);
  });

  return server;
};
