const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Broadcast to all users when a new user joins
  socket.broadcast.emit('user-connected', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Broadcast to all users when a user disconnects
    socket.broadcast.emit('user-disconnected', socket.id);
  });

  // Handle screen sharing request
  socket.on('request-screen-share', (requesterId) => {
    // Broadcast the screen share request to all users except the requester
    socket.to(requesterId).emit('screen-share-request', socket.id);
  });

  // Handle screen sharing approval
  socket.on('approve-screen-share', (approverId) => {
    // Broadcast the screen share approval to all users except the approver
    socket.to(approverId).emit('screen-share-approved', socket.id);
  });

  // Handle screen sharing rejection
  socket.on('reject-screen-share', (rejecterId) => {
    // Broadcast the screen share rejection to all users except the rejecter
    socket.to(rejecterId).emit('screen-share-rejected', socket.id);
  });
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
