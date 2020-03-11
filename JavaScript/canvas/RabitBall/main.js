const canvas1 = document.getElementById("cv1");
const canvas2 = document.getElementById("cv2");
canvas1.width = canvas2.width = 350;
canvas1.height = canvas2.height = 500;
const cv1 = canvas1.getContext("2d");
const cv2 = canvas2.getContext("2d");

class Rabit{
  constructor() {
    this.r = 10;
    this.y = this.r + 10;
    this.x = Math.floor(Math.random() * (canvas1.width - this.r) + this.r);
    this.dx = this.dy = 0;
    this.f = false;
  }

  draw(){
    cv1.clearRect(0,0,canvas1.width,canvas1.height);
    cv1.beginPath();
    cv1.lineWidth = 3;
    cv1.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    cv1.stroke();
    cv1.closePath();
  }

  moveLeft(){
    this.dx = -5;
  }

  moveRight(){
    this.dx = 5;
  }

  fallDown(press){
    if (!press) this.y += 5;
    else this.y += 7; 
  }

  move(){
    if (this.x - this.r == 0 || this.x + this.r == canvas1.width) this.standStill();
    else this.x += this.dx;

    // this.fallDown(false);
  }

  standStill(){
    this.dx = 0;
  }


}


const b = new Rabit();
function loop(){
  b.draw();
  b.move();
  let start = requestAnimationFrame(loop);
  if (b.y > canvas1.height) cancelAnimationFrame(start); // dead
}
window.addEventListener("keydown",function(e){
  switch (e.keyCode) {
    case 37:
      b.moveLeft();
      break;
    case 39:
      b.moveRight();
      break;
    case 40:
      b.fallDown(true);
      break;
    default:
      break;
  }
});

window.addEventListener("keyup",function(){
  b.standStill();
})
loop();