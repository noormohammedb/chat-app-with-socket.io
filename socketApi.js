const socket_io = require('socket.io');
const io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection',socket=>{
   console.log('socket connection');

   socket.on('chat_send',console.log)

});


module.exports = socketApi;