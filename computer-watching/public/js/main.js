window.onload = function(){
  const screen = document.getElementById("screenCpt")
  const webcam = document.getElementById("webcamCpt")
  const socket = io()
  
  webcam.addEventListener("click", function(){
    socket.emit("start_webcam")
  })

  socket.on("connect_to_server", function(p){
    console.log(p);
  })

  socket.on("recording", function(p){
    console.log(p);
  })
}