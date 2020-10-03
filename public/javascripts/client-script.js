console.log('javascript runnig');

var socket = io();


socket.on('connect', () => {
   console.log('socket connection');
});


document.getElementById('button-addon2').addEventListener('click', (e) => {
   e.preventDefault();
   userMessage = document.getElementById('message-box')
   console.log('clicked  ', userMessage.value);
   if(userMessage.value)
   socket.emit('chat_send', userMessage.value)
   userMessage.value = '';

})

socket.on('chat_receive',(socket_message)=>{
   push({message:socket_message})
})

let wrapClone
let wrapDiv = document.getElementsByClassName('wrap')[0];
let con = document.getElementById('message-container');

let push = (data) => {
   // wrapClone = wrapDiv.cloneNode(true)
   var ele = document.createElement('div');
   ele.classList = 'wrap';
   ele.innerHTML = `
                  <h5 class="display-6" id="chat-username">username {{username}} </h5>
                  <p class="lead" id="chat-message">${data.message}</p>
                  <p> time {{time}} </p>`
   con.prepend(ele)
}

// push({message:'heoo'});
// push({message:'loo'});


