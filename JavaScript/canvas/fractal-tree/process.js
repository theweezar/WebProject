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
    this.queue = [];
    this.draw();
  }
  rotate(n,l,al){
    let dx = Math.sin(n*al) * l;
    let dy = Math.cos(n*al) * l;
    // this.x = this.x + dx;
    // this.y = this.y - dy;
    // console.log(`x:${this.x} and y:${this.y}`);
    return {dx:dx,dy:dy};
  }
  push(){
    this.queue.push({x:this.x,y:this.y});
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
    if (l > 4 && n <= 2){
      this.push();

      c.moveTo(this.x,this.y);
      let dis_r = this.rotate(n,l,this.al);
      this.x += dis_r.dx;
      this.y -= dis_r.dy;
      c.lineTo(this.x,this.y);

      this.push();

      let old_c = this.queue[0]; // p = p.slice(-(p.length - 1));
      this.queue = this.queue.slice(-(this.queue.length - 1)); // pop
      this.x = old_c.x;
      this.y = old_c.y;

      c.moveTo(this.x,this.y);
      let dis_l = this.rotate(n,l,-this.al);
      this.x += dis_l.dx;
      this.y -= dis_l.dy;
      c.lineTo(this.x,this.y);

      c.stroke();


      console.log(`x:${this.x} and y:${this.y}`);
      console.log(this.queue);
      // this.loop(++n,l * 0.7);
    }
  }
}

const Tree = new FractalTree();

window.addEventListener("click",(e) => {
  console.log(`mouse_x:${e.x} and mouse_y:${e.y}`);
})