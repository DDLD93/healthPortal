const { Server } = require("socket.io");

const socketSession = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected');
        io.emit("message", socket.client.conn.server.clientsCount + " users connected")
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    return  io
}
module.exports = {
    socketSession
}