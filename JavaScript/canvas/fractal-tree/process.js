const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
cv.width  = 1000;
cv.height = 500;

class FractalTree{
  constructor() {
    this.x = cv.width/2;
    this.y = cv.height;
    this.length = 100;
    c.moveTo(this.x,this.y);
    c.lineWidth = 2;
    this.draw(this.x,this.y,100);
  }

  rotate = (xCurrent = 0,yCurrent = 0,deg = 0,length = 0) => {
    const xNew = length * Math.sin(deg) + xCurrent;
    const yNew = length * Math.cos(deg) + yCurrent;
    return {x:xNew,y:yNew};
  }
  
  draw = (x,y,len) =>{
    c.lineTo(x,y - len);
    let coord = this.rotate(x,y - len,5*Math.PI/6,len);
    c.lineTo(coord.x,coord.y);
    coord = this.rotate(coord.x,coord.y - len,5*Math.PI/6,len);
    c.lineTo(coord.x,coord.y);
    coord = this.rotate(coord.x,coord.y - len,5*Math.PI/6,len);
    c.lineTo(coord.x,coord.y);
    c.stroke();
    
  }
}

const Tree = new FractalTree();