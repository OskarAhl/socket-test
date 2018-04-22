const socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createMessage', {
        to: 'server',
        text: 'yes'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
    console.log(msg);
});