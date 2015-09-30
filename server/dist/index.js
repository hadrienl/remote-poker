'use strict';

var webserver = require('./web-server')({
    host: 'localhost',
    port: 4321
}),
    webSocketServer = require('./websocket-server')(webserver);