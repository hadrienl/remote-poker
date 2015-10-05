var _ = require('lodash');

class Room {
  _rooms = [];

  enter (data, connection, request, server) {
    console.log(`Entered room #${data.id}`);

    if (!connection.user) {
      connection.sendUTF(JSON.stringify({
        type: 'room.enter',
        error: 'User is not authentified'
      }));
      return;
    }

    let room = _.findWhere(this._rooms, { id: data.id});

    if (!room) {
      room = {
        id: data.id,
        connections: []
      };
      // TODO : make a class
      this._rooms.push(room);
    }

    room.connections.push(connection);

    this._sendMessage(room, {
      type: 'room.enter',
      data: {
        room: room.id,
        user: connection.user
      }
    });
  }

  leave (data, connection, request, server) {
    console.log(`Leaved room #${data.id}`);

    let room = _.findWhere(this._rooms, { id: data.id});

    if (!room) {
      return;
    }

    this._room.connections.splice(this._room.indexOf(connection), 1);

    this._sendMessage(room, {
      type: 'room.leave',
      data: {
        room: room.id,
        user: connection.user
      }
    });
  }

  _sendMessage (room, message) {
    room.connections.forEach(connection => {
      connection.sendUTF(JSON.stringify({ type: 'room.enter', data: connection.user }));
    });
  }
}

module.exports = new Room();
