const cv = document.querySelector("canvas");
const c  = cv.getContext("2d");
cv.width  = 1000;
cv.height = 500;

class FractalTree{
  constructor() {
    
  }
  rotate(n=0,l=0,al=0){
    let dx = Math.sin(n*al) * l;
    let dy = Math.cos(n*al) * l;
    // console.log(`x:${this.x} and y:${this.y}`);
    return {dx:dx,dy:dy};
  }
  
  
}

const Tree = new FractalTree();

window.addEventListener("click",(e) => {
  console.log(`mouse_x:${e.x} and mouse_y:${e.y}`);
})