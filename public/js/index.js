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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
});

/*socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('got it ', data);
});*/

socket.on('newLocationMessage', function (message) {
  console.log(message, message);
  var formattedTime = moment(message.createAt).format('h:mm a');
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank"> My Current Location </a>');
  li.text(`${message.from} ${formattedTime}`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageText = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageText.val()
  }, function () {
    messageText.val('');
  })
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })
});

//emit
/*socket.emit('createMessage', {
  form:'xyz.gmail.com',
  text:'Hello, I am good'
});*/
