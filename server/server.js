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
io.on('connection', socket => {
    clients++;
    console.log(clients + " user connected")
    socket.on('new-user', name => {
        socket.username = name.name;
        socket.room = name.room
        socket.join(name.room)
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
        socket.broadcast.to(socket.room).emit('disconnected', socket.username)
    })

})



server.listen(4000, function (error) {
    if (error) throw error
    console.log("listening on 4000")
})
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})