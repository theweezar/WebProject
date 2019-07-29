const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
const Length = 5;
const R = 30;

cv.width = 1000;
cv.height = 600;

const Distance = (x1=0,y1=0,x2=0,y2=0) => {
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
};

const resolveCollision = (m1,u1,m2,u2) => {
  // https://en.wikipedia.org/wiki/Elastic_collision
  // m la khoi luong, u12 la` van toc ban dau
  

};

class Ball{
  constructor(x=0,y=0) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * Math.floor(Math.random()*(8+1-3)+3);
    this.dy = Math.random() * Math.floor(Math.random()*(8+1-3)+3);
    this.m = 1; // mass: khoi luong
  }

  move = () => {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + R > cv.width || this.x - R < 0) this.dx = -this.dx;
    if (this.y + R > cv.height || this.y - R < 0) this.dy = -this.dy; 
  }

  draw = () => {
    c.beginPath();
    c.arc(this.x,this.y,R,0,Math.PI*2,false);
    c.lineWidth = 2;
    c.strokeStyle = "black";
    c.stroke();
    c.closePath();
  }

  collision = (Balls = [new Ball()]) => {
    Balls.forEach(ball => {
      if (Distance(this.x,this.y,ball.x,ball.y) <= R*2 && Distance(this.x,this.y,ball.x,ball.y) > 0){
        console.log("touch");
      }
    });
  }

  render = (Balls = [new Ball()]) => {
    this.draw();
    this.move();
    this.collision(Balls);
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
        // too_close means this ball touch another ball -> then we have to random x,y again
        return Distance(ball.x,ball.y,x,y) < R * 2; // if (touch) break and return true;
      });
      if (!too_close) array.push(new Ball(x,y)); // if (don't touch) push new Ball(x,y)
    }
  }
  return array;
}

const Balls = Init();

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,cv.width,cv.height);
  Balls.forEach(ball => {
    ball.render(Balls);
  });
}
animate();