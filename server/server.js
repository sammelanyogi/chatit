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
        socket.broadcast.emit('new-user', name)
    })
    socket.on('message', messages => {
        console.log("going to broadcast now")
        console.log(socket.id)
        socket.broadcast.emit('new-message', messages)
    });
    socket.on('typing', name => {
        socket.broadcast.emit('typing', name)
    })
    socket.on('disconnect', () => {
        clients--;
        console.log("disconnected")
        console.log(clients + " user connected")
    })

})



server.listen(4000, function (error) {
    if (error) throw error
    console.log("listening on 4000")
})