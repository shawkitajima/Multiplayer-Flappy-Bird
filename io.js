const io = require('socket.io')();

io.on('connection', function(socket) {
    console.log('socket connected!');
});


module.exports = io;