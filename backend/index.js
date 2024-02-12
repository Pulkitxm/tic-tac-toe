const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const cors = require("cors")

app.use(express.static('public'));
app.use(cors())

io.on('connection', (socket) => {
  socket.on('want-to-play', (data) => {
    io.emit('new-user', {
      message:"new user wants to play",
      username:data.username
    });
  });
  socket.on('lets-join', (data) => {
    io.emit('join-room', data);
  });
  socket.on('next-move', (data) => {
    io.emit('next-move', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
