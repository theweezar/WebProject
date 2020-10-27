$(function(){
  const socket = io();
  console.log(socket);

  socket.on("connect", () => {
    console.log("Connected to server");
  })

  $("#sendBtn").click(e => {
    // console.log($("input#msg").val());
    if ($("input#msg").val().trim().length != 0){
      socket.emit("POST_MSG",{
        userName:"anonymous",
        msg: $("input#msg").val()
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
            [ ${data.packet.userName} ]
          </span> 
          <span class="time">
            [ ${timeStr} ]
          </span>
          ====> 
          ${data.packet.msg}
        </p>
      </div>`
    )
  });


});