let socket = io();
socket.on('connect', function(){
  console.log('Server is connected');
});
socket.on('disconnect', function(){
  console.log('Server is disconnected');
});
//listener
socket.on('newMessage', function (newMessage) {
  console.log('newMessage ', newMessage);
});

//emit
/*socket.emit('createMessage', {
  form:'xyz.gmail.com',
  text:'Hello, I am good'
});*/
