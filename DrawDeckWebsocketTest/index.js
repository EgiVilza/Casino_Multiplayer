var express = require('express')
var socket = require('socket.io')

// App setup
var app = express();

var server = app.listen(1222, function(){
    console.log('Listening on port 1222.')
})

//Static files

app.use(express.static('public'))

//Socket set up

var io = socket(server)

io.on('connection', function(socket){
    console.log('Socket connection made. Socket ID: ' + socket.id)

    socket.on('drawCard', function(data){
        io.sockets.emit('drawCard', data)
    })

})