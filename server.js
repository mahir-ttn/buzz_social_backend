const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { CLIENT_URL, PORT, MONGO_URI, cookie } = require('./config');
const passport = require('passport');

const app = express();

// middleware
app.use(
  cors({
    origin: CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.set('trust proxy', 1);
app.use(cookieSession(cookie));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/index'));

mongoose.connect(MONGO_URI, (err) => {
  !err && console.log('connected to database');
  err && console.log(err.message);
});

const server = app.listen(PORT, () =>
  console.log('Server running at port', PORT)
);

const io = require('socket.io')();
io.attach(server, { cors: { origin: CLIENT_URL } });

io.on('connection', (socket) => {
  socket.on('join', (room) => socket.join(room));

  socket.on('send-message', (messageData, room) => {
    socket.to(room).emit('receive-message', messageData);
  });
});
