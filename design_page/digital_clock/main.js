function RunTime(){
  let time = new Date();
  let h = time.getHours();

  if (h > 12) h = h - 12;
  else if (h == 0) h = 12;

  let m = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();
  let s = time.getSeconds() < 10 ? "0"+time.getSeconds() : time.getSeconds();

  let cur = `${h < 10 ? "0"+h:h} : ${m} : ${s}`;

  document.getElementById("time").innerText = cur;
  document.getElementById("session").innerText = time.getHours() > 12 ? "PM" : "AM";
}

setInterval(RunTime,1000);