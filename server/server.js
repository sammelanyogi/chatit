const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var clients = 0;
io.on('connection', socket => {
    clients++;
    console.log(clients + " user connected")

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