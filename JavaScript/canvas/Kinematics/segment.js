const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = 1000;
cv.height = 500;


class Segment{
  constructor(x,y,len,al) {
    this.h1 = {x:x,y:y}; // head 1
    this.len = len;
    this.al = al;
    this.h2 = {x:undefined,y:undefined}; // head 2
    // this.parent
    this.render();
  }

  calcH2(){
    let alWithPI = this.al * Math.PI / 180;
    this.h2.x = this.h1.x + this.len * Math.cos(alWithPI);
    this.h2.y = this.h1.y + this.len * Math.sin(alWithPI);
  }

  draw(){
    c.beginPath();
    c.lineWidth = 2;
    c.moveTo(this.h1.x,this.h1.y);
    c.lineTo(this.h2.x,this.h2.y);
    c.stroke();
    c.closePath();
  }

  render(){
    this.calcH2();
    this.draw();
  }
}

const seg = new Segment(cv.width/2,cv.height/2,150,60);

