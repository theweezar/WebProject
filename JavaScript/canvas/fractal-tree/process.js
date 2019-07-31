const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
cv.width  = 1000;
cv.height = 500;

class FractalTree{
  constructor() {
    this.x = cv.width / 2;
    this.y = 400;
    this.len = 100;
    this.al = Math.PI / 3;
    this.draw();
  }
  rotate(n){
    let dx = Math.sin(n*this.al) * this.len;
    let dy = Math.cos(n*this.al) * this.len;
    this.x = this.x + dx;
    this.y = this.y - dy;
    console.log(`x:${this.x} and y:${this.y}`);
  }
  draw = () =>{
    c.lineWidth = 2;
    c.moveTo(this.x,this.y + this.len);
    c.lineTo(this.x,this.y);
    this.rotate(1);
    c.lineTo(this.x,this.y);
    this.rotate(2);
    c.lineTo(this.x,this.y);
    this.rotate(3);
    c.lineTo(this.x,this.y);
    c.stroke();
  }
}

const Tree = new FractalTree();