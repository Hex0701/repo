// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const { v4: uuidV4 } = require('uuid');
// const cors = require('cors'); // Import the 'cors' package

// app.use(cors({ origin: '*' }));


// app.set('view engine', 'ejs');
// app.use(express.static('public'));


// app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`);
// });

// app.get('/:room', (req, res) => {
//   res.render('room', { roomID: req.params.room });
// });

// io.on('connection', (socket) => {
//   socket.on('joinRoom', (roomID, userID) => {
//     socket.join(roomID);
//     socket.to(roomID).emit('user-connected', userID);

//     socket.on('disconnect', () => {
//       socket.to(roomID).emit('user-disconnected', userID);
//     });
//   });
// });

// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomID: req.params.room });
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomID, userID) => {
    socket.join(roomID);
    socket.to(roomID).emit('user-connected', userID);

    socket.on('disconnect', () => {
      socket.to(roomID).emit('user-disconnected', userID);
    });
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
