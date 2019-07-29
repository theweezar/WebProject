const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");

cv.width = window.innerWidth;
cv.height = window.innerHeight;

const Distance = (x1=0,y1=0,x2=0,y2=0) => {
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
};

class Ball{
  constructor(x=0,y=0) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.dx = Math.random() * Math.floor(Math.random()*(30+1-5)+5);
    this.dy = Math.random() * Math.floor(Math.random()*(30+1-5)+5);
  }

  draw = () => {

  }
}