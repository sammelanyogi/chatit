const app = require('express')();
const server = require('http').Server(app);
// const bodyParser = require('body-parser');
// const https = require('https');
// const fs = require('fs');
// const cors = require('cors')
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// var server = https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// }, app);
const io = require('socket.io')(server, { origins: '*:*' });
var clients = 0;
var rooms = [];

io.on('connection', socket => {
    clients++;
    console.log(clients + " user connected")
    socket.on('validation', data => {
        var obj = rooms.find(x => x.room === data.room);
        if (obj === undefined) {
            socket.emit('validation', true)
        }
        else if (obj.members.includes(data.username)) {
            socket.emit('validation', false)
        }
        else {
            socket.emit('validation', true)
        }
    })
    socket.on('new-user', name => {

        if (rooms.find(x => x.room === name.room) === undefined) {
            var some = [];
            some.push(name.name)
            rooms.push({ room: name.room, members: some });
        }
        else {
            var i = rooms.findIndex(x => x.room === name.room);
            rooms[i].members.push(name.name)
        }
        console.log(rooms)
        socket.username = name.name;
        socket.room = name.room
        socket.join(name.room)
        var ject = rooms.find(x => x.room === name.room)
        socket.emit('datas', ject.members, name.name)
        socket.broadcast.to(name.room).emit('new-user', name.name);
    })
    socket.on('message', messages => {
        console.log("going to broadcast to room: " + messages.room)
        socket.broadcast.to(messages.room).emit('new-message', messages)
    });
    socket.on('typing', name => {
        socket.broadcast.to(name.room).emit('typing', name.text)
    })
    socket.on('disconnect', () => {
        clients--;
        console.log(clients + " user connected")
        var i = rooms.findIndex(x => x.room === socket.room);
        if (i !== -1) {
            rooms[i].members.splice(rooms[i].members.indexOf(socket.username), 1)
            if (rooms[i].members.length === 0) {
                rooms.splice(i, 1);
            }
        }
        socket.broadcast.to(socket.room).emit('disconnected', socket.username)
        console.log(rooms)
    })

})



server.listen(4000, function (error) {
    if (error) throw error
    console.log("listening on 4000")
})
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})