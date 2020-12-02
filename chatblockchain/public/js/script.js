$(function(){
  const socket = io();
  console.log(socket);

  socket.on("connect", () => {
    console.log("Connected to server");
  })

  function updateScroll(){
    var element = document.getElementById("msgBox");
    element.scrollTop = element.scrollHeight;
  }

  $("#sendBtn").click(e => {
    // console.log($("input#msg").val());
    const msg = $("input#msg").val().trim();
    if (msg.length != 0){
      if (msg.match(/(<script>)[\w+|\W+]+(<\/script>)/g) != null){
        alert("XSS Attack is detected");
      }
      else socket.emit("POST_MSG",{
        userName: USERNAME,
        msg: msg
      });
    }
    $("input#msg").val("");
  })

  socket.on("SEND_MSG_TO_ALL", data => {
    console.log(data);
    let time = new Date(data.timeStamp);
    let timeStr = `${time.getDate() < 10 ? "0" + time.getDate():time.getDate()}-${time.getMonth()+1 < 10 ? "0"+time.getMonth()+1:time.getMonth()+1}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()}`;
    $("#msgBox").append(
      `<div class="other">
        <p>
          <span class="nickname">
            [${data.packet.userName}]
          </span> 
          <span class="time">
            [${timeStr}]
          </span>
          <div>
          ===> 
          ${data.packet.msg}
          </div>
        </p>
      </div>`
    );
    updateScroll();
  });

  updateScroll();
});