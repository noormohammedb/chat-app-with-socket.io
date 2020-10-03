var socket = io();
socket.on('connect', () => {
   console.log('socket connection');
});

var username = '';
var mod = document.getElementsByClassName('modal')[0]
var usernameDom = document.getElementById('username')


/*
 * for send message and refocus to message box
 */
document.getElementById('button-addon2').addEventListener('click', (e) => {
   e.preventDefault();
   userMessage = document.getElementById('message-box')
   console.log('clicked  ', userMessage.value);
   if (userMessage.value) {
      let timeNow = new Date()
      socketObject = {
         username: username,
         message: userMessage.value,
         time: `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
      }
      socket.emit('chat_send', socketObject)
   }
   userMessage.value = '';
   userMessage.focus();
})

/*
 * for set username
 */
document.getElementById('message-box').addEventListener('focus', () => {
   console.log('focus');
   if (!username){
      mod.style.display = 'block';
      usernameDom.focus();
   }

})

/*
 * for save username
 */
document.getElementById('modal_save').addEventListener('click', () => {
   if (usernameDom.value)
      mod.style.display = 'none';
   username = usernameDom.value;
   console.log('save click  ', username);
})


socket.on('chat_receive', (chat_rec)=>{
   push(chat_rec);
});

let con = document.getElementById('message-container');
let push = (data) => {
   console.log(data);
   var ele = document.createElement('div');
   ele.classList = 'wrap';
   ele.innerHTML = `
                  <h5 class="display-6" id="chat-username">${data.username}</h5>
                  <p class="lead" id="chat-message">${data.message}</p>
                  <p> ${data.time} </p>`
   con.prepend(ele)
}
