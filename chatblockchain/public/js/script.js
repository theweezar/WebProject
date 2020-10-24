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

  socket.on("SEND_MSG_TO_ALL", packet => {
    console.log(packet);
    $("#msgBox").append(
      `<div class="other">
        <p>
          <span class="nickname">[ ${packet.userName} ]</span> ====> 
          ${packet.msg}
        </p>
      </div>`
    )
  })
});