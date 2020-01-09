const io = require('socket.io')();

io.on('connection', function(socket) {
    socket.on('up', function() {
        io.emit('moveUp');
    });
    socket.on('down', function() {
        io.emit('moveDown');
    });
});


module.exports = io;