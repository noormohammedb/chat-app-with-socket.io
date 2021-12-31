import { Server, Socket } from "socket.io";
// socket_io,
// const socket_io = require('socket.io');
const io = new Server();
var socketApi: any = {};

socketApi.io = io;

io.on('connection', socket => {
   console.log('socket connection');

   socket.on('chat_send', (data: any) => {
      console.log(data);
      io.sockets.emit('chat_receive', data)
   })

});


// module.exports = socketApi;
export default socketApi;
