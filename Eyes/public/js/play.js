(() => {
  const socket = io();
  let songs = document.querySelectorAll("li");

  songs.forEach(s => {
    s.addEventListener("click",function(){
      console.log(this.getAttribute("link"));
      socket.emit("REQUEST_PLAY_A_SONG",{
        link: this.getAttribute("link")
      });
    });
  });
})();