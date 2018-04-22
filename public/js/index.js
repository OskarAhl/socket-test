const socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
    console.log(msg);

    const li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message').val()
    }, (data) => {
        // fires if acknowledgeement 
        console.log(data);
    });
});