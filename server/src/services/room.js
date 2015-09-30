class Room {
  enter (data, connection, request, server) {
    console.log('entered room', data.id);
  }

  leave (data, connection, request, server) {
    console.log('leaved room', data.id);
  }
}

module.exports = new Room();
