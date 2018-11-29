let socket = io();

function scrollToBottom () {
  // Selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  // Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  let params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log('No error');
    }
  });

  console.log('Server is connected');
});
socket.on('disconnect', function(){
  console.log('Server is disconnected');
});
//listener
socket.on('updateUserList', function (users) {
  let ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);

});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

/*socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('got it ', data);
});*/

socket.on('newLocationMessage', function (message) {
  console.log(message, message);
  let formattedTime = moment(message.createAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
