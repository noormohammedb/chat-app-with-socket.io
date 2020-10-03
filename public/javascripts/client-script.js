var socket = io();

console.log('javascript runnig');

document.getElementById('button-addon2').addEventListener('click',(e)=>{
   e.preventDefault();
   message = document.getElementById('message-box').value
   console.log('clicked  ', message);

   socket.emit('chat_send', message)
})


socket.on('connect',()=>{
   console.log('socket connection');

});
