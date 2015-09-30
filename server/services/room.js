module.exports = {
  enter: function (data, connection, request, server) {
    console.log('entered room', data.id);
  },
  leave: function (data, connection, request, server) {
    console.log('leaved room', data.id);
  }
};
