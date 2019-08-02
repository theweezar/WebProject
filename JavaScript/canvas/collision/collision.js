const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
const Length = 10;
const R = 30;
let start;

cv.width = 1000;
cv.height = 600;

const Distance = (x1=0,y1=0,x2=0,y2=0) => {
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
};

const rotate = (dx = 0, dy = 0, angle = 0) => { // some bug in here
  // https://www.slideshare.net/VietTriEdu/cng-thc-php-quay-d-hiu
  // Phep quay do thi
  const dxNew = dx * Math.cos(angle) - dy * Math.sin(angle);
  const dyNew = dx * Math.sin(angle) + dy * Math.cos(angle);
  return {dx:dxNew,dy:dyNew};
};

const resolveCollision = (thisBall = new Ball(), otherBall = new Ball()) => {
  // https://en.wikipedia.org/wiki/Elastic_collision
  // m là khối lượng, v là vận tốc
  const xOffset = thisBall.x - otherBall.x;
  const yOffset = thisBall.y - otherBall.y;
  const dxOffset = thisBall.dx - otherBall.dx;
  const dyOffset = thisBall.dy - otherBall.dy;

  const PlusMass = thisBall.m + otherBall.m;
  const MinusMass = thisBall.m - otherBall.m;

  if (true){ //dxOffset * xOffset + dyOffset * yOffset >= 0
    const angle = Math.PI/2 - -Math.atan(Math.abs(xOffset/yOffset)); // some bug in here
    const v1 = rotate(thisBall.dx,thisBall.dy,angle); 
    const v2 = rotate(otherBall.dx,otherBall.dy,angle);
  
    const v1_tmp = {dx: (MinusMass * v1.dx / PlusMass) + (2 * otherBall.m * v2.dx / PlusMass),dy:v1.dy};
    const v2_tmp = {dx: (2 * thisBall.m * v1.dx / PlusMass) + (-MinusMass * v2.dx / PlusMass),dy:v2.dy};
  
    const v1Final = rotate(v1_tmp.dx,v1_tmp.dy,-angle); // new thisBall dx,dy
    const v2Final = rotate(v2_tmp.dx,v2_tmp.dy,-angle); // new otherBall dx,dy
  
    thisBall.dx = v1Final.dx;
    thisBall.dy = v1Final.dy;
  
    otherBall.dx = v2Final.dx;
    otherBall.dy = v2Final.dy;
  }
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
        resolveCollision(this,ball);
        // cancelAnimationFrame(start);
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
  start = requestAnimationFrame(animate);
  c.clearRect(0,0,cv.width,cv.height);
  Balls.forEach(ball => {
    ball.render(Balls);
  });
}
animate();