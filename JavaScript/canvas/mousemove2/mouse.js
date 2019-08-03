const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = window.innerWidth;
cv.height = window.innerHeight - 5;

const middle = {x:cv.width/2,y:cv.height/2}; // (500,250)
const mouse = {x:middle.x,y:middle.y};
const colors = ["#1A1A1D","#C3073F","#7395AE","#3FEEE6","#05386B","#2F2FA2","#542F34","#022140"];
const max = 150, min = 50;

class Spot{
  constructor(){
    this.current = {x:mouse.x,y:mouse.y};
    this.color = colors[Math.floor(Math.random()*(colors.length - 0) + 0)];
    this.lx = Math.floor(Math.random()*(max-min)+min);
    this.ly = Math.floor(Math.random()*(max-min)+min);
    this.r = Math.floor(Math.random()*(4-1)+1);
    this.al = Math.floor(Math.random()*(181-0)+0);
    this.first_al = this.al;
    this.direction = (0.5 - Math.random()); // quay nguoc / theo chieu kim dong ho
    this.speed = Math.floor(Math.random()*(5-1)+1) * this.direction / Math.abs(this.direction); // (1 hoac -1)
    this.calc();
  }
  calc(){
    this.al += this.speed;
    // reset angel. Otherwise it will be +Infinite or -Infinite
    if (this.al >= this.first_al + 360 || this.al <= this.first_al - 360) this.al = this.first_al; 
    let alwithPI = this.al * Math.PI / 180;
    this.current.x = mouse.x + Math.sin(alwithPI) * this.lx;
    this.current.y = mouse.y + Math.cos(alwithPI) * this.ly;
    // console.log(this.al);
  }
  draw(){
    c.fillStyle = c.strokeStyle = this.color;
    c.lineTo(this.current.x,this.current.y);
    c.stroke();
  }
  render(){
    c.beginPath();
    c.lineWidth = 2;
    c.moveTo(this.current.x,this.current.y);
    this.calc();
    this.draw();
    c.closePath();
  }
}

let spotList = [], length = 30;

function Init(){
  for(let i = 0; i < length; i++){
    spotList.push(new Spot());
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255,255,255,0.2)";
  c.fillRect(0,0,cv.width,cv.height);
  // c.clearRect(0,0,cv.width,cv.height);
  spotList.forEach(spot => {
    spot.render();
  });
}

Init();
animate();

window.addEventListener("mousemove",e => {
  mouse.x = e.x;
  mouse.y = e.y;
});