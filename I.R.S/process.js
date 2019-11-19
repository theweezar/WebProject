
class Chatbot{

  constructor() {
    this.humanMsg = '';
    this.botMsg = 'Hello my fellow Human';
    this.sendMsg(); 
  }

  sendMsg(){
    document.getElementById("msg-box").innerHTML += `<li class="for-bot">${this.botMsg}</li>`;
    this.botMsg = '';
    this.humanMsg = '';
  }

  receiveMsg(msg=''){
    this.humanMsg = msg;
    document.getElementById("msg-box").innerHTML += `<li class="for-me">${this.humanMsg}</li>`;
    this.analyze();
    this.sendMsg();
  }

  analyze(){
    let Reg = [];//new RegExp('hi','g');
    let words = [...this.humanMsg.split(/ /g)];
    // tách chuỗi và đổi thành RegExp
    words.forEach(word => {
      Reg.push(new RegExp(word.toLocaleLowerCase(),'g'));
    })
    console.log(Reg);
  
    // Match với phần tử trong input của mỗi tag
    let pList = [];
    data.forEach(a => {
      let match = []; // tạo 1 mảng match tổng
      let match_len = a.input.length;
      let match_p = 0;
      Reg.forEach((reg,i) => {
        match.push([]); // cứ mỗi Regexp thì sẽ có thêm 1 mảng
        a.input.forEach(el => {
          if (el.match(reg) !== null){
            match[i].push(1);
          }
          else match[i].push(0);
        });
      });
  
      // Cộng tất cả giá trị của từng cột, nếu giá trị đó !== 0 thì match_p++
      
      for(let k = 0; k < match_len; k++){
        let tmp = 0;
        for(let j = 0; j < match.length; j++){
          tmp += match[j][k];
        }
        if (tmp !== 0) match_p++;
      }
  
      pList.push(match_p / match_len);
      console.log(match);
      console.log(`Percent: ${match_p}`);
  
    });
  
    console.log(`pList: ${pList}`);
  
    // Ta tìm phần tử lớn nhất trong pList rồi lấy vị trí đó
    let max = pList[0];
    let max_p = 0;
  
    for(let i = 0; i < pList.length; i++){
      for(let j = 0; j < pList.length; j++){
        if (pList[j] > pList[i]){
          max = pList[j];
          max_p = j;
        }
      }
    }
    console.log(max);
    console.log(max_p);
  
    let rand = Math.floor(Math.random()*(data[max_p].output.length-0)+0);
  
    console.log(rand);
    this.botMsg = data[max_p].output[rand];
    console.log(this.botMsg);
    
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
      // console.log(msgTextField.value);
      sendToBot(msgTextField.value.trim());
    }
  });

  this.document.getElementById("send").addEventListener("click",function(){
    // console.log(msgTextField.value);
    sendToBot(msgTextField.value.trim());
  });
}