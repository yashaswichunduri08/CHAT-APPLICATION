const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
const users = {};
io.on('connection', (socket) => {
  socket.on('register', (username) => {
    users[username] = socket.id;
    socket.username = username;
  });
  socket.on('private message', ({ to, message }) => {
    const recipientId = users[to];
    if (recipientId) {
      io.to(recipientId).emit('private message', {
        from: socket.username,
        message,
      });
    } else {
      socket.emit('error', `User ${to} is not online.`);
    }
  });
  socket.on('disconnect', () => {
    delete users[socket.username];
  });
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});