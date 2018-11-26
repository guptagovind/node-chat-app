let socket = io();
socket.on('connect', function(){
  console.log('Server is connected');
});
socket.on('disconnect', function(){
  console.log('Server is disconnected');
});
//listener
socket.on('newMessage', function (message) {
  console.log('newMessage ', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

/*socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('got it ', data);
});*/


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  })

});

//emit
/*socket.emit('createMessage', {
  form:'xyz.gmail.com',
  text:'Hello, I am good'
});*/
