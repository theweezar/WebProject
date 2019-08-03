const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = window.innerWidth;
cv.height = window.innerHeight - 5;

const startPoint = {
  x: 0,
  y: cv.height
};

const endPoint = {
  x: cv.width,
  y: 0
};

const Distance = (x1=0,y1=0,x2=0,y2=0) => {
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
};

class Wave{
  constructor() {
    this.Dist = Distance(startPoint.x,startPoint.y,endPoint.x,endPoint.y);
    this.yDist = Math.abs(startPoint.y - endPoint.y);
    this.h = 100;
    this.inscrement = -0.01;
    this.speed = 0.5;
    this.slowdown = true;
    this.pressure = 0.3; // độ giãn của dây
  }
  calc(){
    this.inscrement -= this.speed;
    if (this.slowdown){
      if (this.speed > 0.02) this.speed -= 0.005;
      else{
        this.speed = 0.02;
        this.slowdown = false;
      }
    }
  }
  draw(){
    c.beginPath();
    c.clearRect(0,0,cv.width,cv.height);
    // c.moveTo(startPoint.x,startPoint.y);
    for(let i = 0; i < this.Dist; i++){
      c.moveTo(i,0);
      c.lineTo(i,startPoint.y + Math.sin(i * Math.PI / 180 * this.pressure - this.inscrement) * this.h - this.yDist / this.Dist * i);
    }
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();
  }
  render(){
    this.draw();
    this.calc();
  }
}

let wave = new Wave();

function animate(){
  requestAnimationFrame(animate);
  wave.render();
}

animate();