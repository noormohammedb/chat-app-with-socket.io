const socket = io();
socket.on("connect", () => {
  console.log("socket connection");
});

let localCookie = document.cookie;
let username = localCookie.split("=").pop();
const mod = document.getElementsByClassName("modal")[0];
const usernameDom = document.getElementById("username");

/*
 * for send message and refocus to message box
 */
const userMessageBox = document.getElementById("message-box");
const submitFunction = () => {
  console.log("clicked  ", userMessageBox.value);
  if (userMessageBox.value) {
    let timeNow = new Date();
    socketObject = {
      username: username,
      message: userMessageBox.value,
      time: `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`,
    };
    socket.emit("chat_send", socketObject);
  }
  userMessageBox.value = "";
  userMessageBox.focus();
}
const form = document.getElementById("send-form")
form.addEventListener("submit", (subEv) => {
  subEv.preventDefault();
  submitFunction()
});

/*
 * for set username
 */
document.getElementById("message-box").addEventListener("focus", () => {
  if (!username) {
    // console.log("modal block");
    mod.style.display = "block";
    usernameDom.focus();
  }
});

/*
 * execute form submission on new line character
 */
document.getElementById("message-box").addEventListener("input", (inputEvent) => {
  // console.log(inputEvent);
  // console.log(`value length : ${userMessageBox.value.length}`);
  if (inputEvent.inputType == "insertLineBreak") {
    // console.log("line break");
    textboxEvent = inputEvent
    if (userMessageBox.value == '\n') {
      // console.log("new line detected");
      userMessageBox.value = userMessageBox.value.slice(0, -1)
    } else if (userMessageBox.value.length > 1) {
      submitFunction()
    }
  }
})

/*
 * for save username
 */
const setUserName = (e) => {
  e.preventDefault();
  let cookieTime = new Date() + 60 * 60 * 1000;
  username = usernameDom.value;
  document.cookie = "username=" + usernameDom.value;
  console.log("save click  ", username);
  if (usernameDom.value) {
    mod.style.display = "none";
    // console.log("modal trigger");
    userMessageBox.focus();
  }
};

document.getElementById("modal_save").addEventListener("click", setUserName);
document.getElementById("name-form").addEventListener("submit", setUserName);

socket.on("chat_receive", (chat_rec) => {
  push(chat_rec);
});

let con = document.getElementById("message-container");
let push = (data) => {
  console.log(data);
  const ele = document.createElement("div");
  ele.classList = "wrap";

  const heading5 = document.createElement("h5")
  heading5.className = "display-6"
  heading5.id = "chat-username"
  heading5.innerText = data.username

  const paraMesg = document.createElement("p")
  paraMesg.className = "lead"
  paraMesg.id = "chat-message"
  paraMesg.innerText = data.message

  const paraTime = document.createElement("p")
  paraTime.innerText = data.time

  ele.appendChild(heading5)
  ele.appendChild(paraMesg)
  ele.appendChild(paraTime)

  // ele.innerHTML = `
  //                 <h5 class="display-6" id="chat-username">${data.username}</h5>
  //                 <p class="lead" id="chat-message">${data.message}</p>
  //                 <p> ${data.time} </p>`;
  con.prepend(ele);
};
