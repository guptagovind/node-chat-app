const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) && !isRealString(params.room)) {
      callback('Name and room are required.');
    }
    callback();
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat app'));

/*  socket.emit('newMessage', {
    from:'abc.gmail.com',
    text:'Hello, How are you?',
    createdAt:'1234567890'
  });*/

  socket.on('createMessage', (createMessage, callback) => {
    console.log('createMessage ', createMessage);
    io.emit('newMessage', generateMessage(createMessage.from, createMessage.text));
    callback('This is from server.');
    /*socket.broadcast.emit('newMessage', {
      from:'Admin',
      text:'New user joined the chat app',
      createdAt:new Date().getTime()
    });*/
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () =>{
    console.log('Client disconnected');
  })
});

server.listen(port, () => {
  console.log(`I am listing at port number ${port}`);
});
