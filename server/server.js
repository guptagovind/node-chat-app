const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New client connected');

/*  socket.emit('newMessage', {
    from:'abc.gmail.com',
    text:'Hello, How are you?',
    createdAt:'1234567890'
  });*/

  socket.on('createMessage', (createMessage) => {
    console.log('createMessage ', createMessage);
    io.emit('newMessage', {
      from:createMessage.from,
      text:createMessage.text,
      createdAt:new Date().getTime()
    })
  });

  socket.on('disconnect', () =>{
    console.log('Client disconnected');
  })
});

server.listen(port, () => {
  console.log(`I am listing at port number ${port}`);
});
