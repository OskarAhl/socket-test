const       path = require('path'),
            http = require('http'),
            express = require('express'),
            socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
// same as app.listen
const server = http.createServer(app);
// --> above needed to configure socket.io for the server
// io is our web socket server - ready to accept new connections
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'mlmay',
        text: 'there?'
    });

    socket.on('createMessage', (msg) => {
        console.log('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});