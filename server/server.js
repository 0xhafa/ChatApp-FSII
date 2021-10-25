const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./modules/messages');
const EventLog = require('./modules/events');
const formatMessage = require('./utils/messages');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Connect to mongoDB
const connectionString = 'mongodb+srv://rafa:123@cluster0.1ivxs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('Connected to Database'))
  .catch((err) => console.log(err))

app.use(cors());
app.use(router);

const botName = 'Server Bot';

io.on('connect', (socket) => {


  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    const newLog = new EventLog({
      eventOwner: user.name,
      eventDesc: `New Socket Connected to ${user.room}`,
      eventName: 'socket-connected'
    })
    newLog.save();

    socket.emit('message', formatMessage(botName, `${user.name}, welcome to room ${user.room}.`));
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.name} has joined!` ));

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    
    io.to(user.room).emit('message', formatMessage(user.name,  message));

    const newMsg = new Message({
      chatRoom: user.room,
      chatUsername: user.name,
      chatMessage: message,
      socketId: socket.id
    })
    newMsg.save();

    callback();
  });

  socket.on('history', () => {
    Message.find((error, document) => {
      socket.emit('printHistory',document);
    }) 
  })

  socket.on('log', () => {
    EventLog.find((error, document) => {
      socket.emit('printLog',document);
    })
  }) 

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      const newLog = new EventLog({
        eventOwner: user.name,
        eventDesc: `User ${user.name} disconnected from ${user.room}`,
        eventName: 'socket-disconnected'
        })
      newLog.save();  

      io.to(user.room).emit('message', formatMessage(botName, `${user.name} has left.` ));
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));