const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
cv.width  = 1000;
cv.height = 500;

class FractalTree{
  constructor(StartX=0,StartY=0) {
    this.startPoint = {x:StartX,y:StartY};
    this.offSetLength = 0.67;
    this.offSetAngle = 30;
    this.start();
  }
  newPoint(current = {x:0,y:0},length=0,angle=0){
    const angleWithPI = angle * Math.PI / 180;
    const nPoint = {
      x: current.x + Math.cos(angleWithPI) * length,
      y: current.y + Math.sin(angleWithPI) * length 
    };
    return nPoint;
  }
  start(){
    c.beginPath();
    c.clearRect(0,0,cv.width,cv.height);
    c.moveTo(this.startPoint.x,this.startPoint.y);
    this.drawBranch(this.startPoint,100,90);
    c.closePath();
  }
  drawBranch(point={x:0,y:0},length=0,angle=0){
    if (length < 4) return;

    c.lineTo(point.x,point.y);
    c.stroke();
    let nPoint = this.newPoint(point,length,-angle); // left
    this.drawBranch(nPoint,length * this.offSetLength, angle + this.offSetAngle);

    c.moveTo(nPoint.x,nPoint.y); // right
    this.drawBranch(nPoint,length * this.offSetLength, angle - this.offSetAngle);
  }
  
}

const Tree = new FractalTree(cv.width/2,cv.height);
alert("Press F12, get to the console and type 'animate()' then enter to see animation");

// window.addEventListener("mousewheel",e => {
//   if (e.wheelDelta < 0){
//     Tree.offSetAngle -= 1;
//     Tree.start();
//   }
//   if (e.wheelDelta > 0){
//     Tree.offSetAngle += 1;
//     Tree.start();
//   }
// });

function animate(){
  requestAnimationFrame(animate);
  Tree.offSetAngle += 1;
  Tree.start();
}

