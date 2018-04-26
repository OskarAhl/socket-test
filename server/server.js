const       path = require('path'),
            http = require('http'),
            express = require('express'),
            socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');    
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
    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and/or room name required');
        }

        // adds user to private chat rooms 
        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        
        // emits to all connected clients
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});