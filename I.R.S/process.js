
class Chatbot{

  constructor() {
    this.humanMsg = '';
    this.botMsg = 'Hello my fellow Human';
    this.sendMsg(); 
  }

  sendMsg(){
    document.getElementById("msg-box").innerHTML += `<li class="for-bot">${this.botMsg}</li>`;
    this.botMsg = '';
  }

  receiveMsg(msg=''){
    this.humanMsg = msg;
    document.getElementById("msg-box").innerHTML += `<li class="for-me">${this.humanMsg}</li>`;

  }

  analyze(){

  }
}

window.onload = function(){
  
  const bot = new Chatbot();
  const msgTextField = document.getElementById("msg");

  function sendToBot(msg = ''){
    if (msg.length !== 0){
      bot.receiveMsg(msg);
      msgTextField.value = '';
    }
  }

  window.addEventListener("keyup",function(event){
    if (event.keyCode === 13){
      console.log(msgTextField.value);
      sendToBot(msgTextField.value.trim());
    }
  });

  this.document.getElementById("send").addEventListener("click",function(){
    console.log(msgTextField.value);
    sendToBot(msgTextField.value.trim());
  });
}