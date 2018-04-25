const socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    
    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (msg) => {
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${msg.from} ${formattedTime}: `);
    a.attr('href', msg.url);
    console.log(msg);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    const messageTextBox = jQuery('[name=message');

    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, (data) => {
        // fires if acknowledgeement 
        messageTextBox.val('');
    });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function () {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location').text('Send Location');
    });
});