const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
cv.width  = 1000;
cv.height = 500;

class FractalTree{
  constructor() {
    this.x = cv.width / 2;
    this.y = 400;
    this.len = 100; // first length
    this.al = Math.PI / 3;
    this.draw();
  }
  rotate(n,l){
    let dx = Math.sin(n*this.al) * l;
    let dy = Math.cos(n*this.al) * l;
    // this.x = this.x + dx;
    // this.y = this.y - dy;
    // console.log(`x:${this.x} and y:${this.y}`);
    return {dx:dx,dy:dy};
  }
  draw = () =>{
    c.lineWidth = 2;
    c.moveTo(this.x,this.y + this.len);
    c.lineTo(this.x,this.y);
    c.stroke();
    this.loop(1,this.len);
  }
  loop(n,l){
    // ============= Loop start here ============= //
    if (l > 4){
      c.moveTo(this.x,this.y);
      let dis = this.rotate(n,l);
      this.x += dis.dx;
      this.y -= dis.dy;
      c.lineTo(this.x,this.y);
      c.stroke();
      this.loop(++n,l * 0.7);
    }
  }
}

const Tree = new FractalTree();