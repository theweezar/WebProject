const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
const Length = 10
const R = 20;

cv.width = window.innerWidth;
cv.height = window.innerHeight;

const Distance = (x1=0,y1=0,x2=0,y2=0) => {
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
};

class Ball{
  constructor(x=0,y=0) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * Math.floor(Math.random()*(30+1-5)+5);
    this.dy = Math.random() * Math.floor(Math.random()*(30+1-5)+5);
  }

  draw = () => {
    c.beginPath();
    c.arc(this.x,this.y,R,0,Math.PI*2,false);
    c.strokeStyle = "black";
    c.stroke();
    c.closePath();
  }

  render = () => {
    this.draw();
  }
}

function Init(){
  let array = [];
  while(array.length < Length){
    let x = Math.floor(Math.random()*(cv.width - R - R*2) + R*2);
    let y = Math.floor(Math.random()*(cv.height - R - R*2) + R*2);
    if (array.length === 0){
      array.push(new Ball(x,y));
    }
    else{
      let too_close = array.some(ball => {
        return Distance(ball.x,ball.y,x,y) < R * 2;
      });
      if (!too_close) array.push(new Ball(x,y));
    }
  }
  return array;
}

const Balls = Init();

function animate(){
  requestAnimationFrame(animate);
  Balls.forEach(ball => {
    ball.render();
  });
}
animate();