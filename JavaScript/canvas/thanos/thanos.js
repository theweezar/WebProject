const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = 1000;
cv.height = 500;

const victim = new Image();
victim.src = "victim.png";
victim.width = 100;
victim.height = 100;

class Thanos{
  constructor() {
    this.x = 300;
    this.y = 50;
    this.imgData = [];
    this.imgCoord = [];
    this.imgVel = [];
    this.speed = 1.5;
    this.getImageDataList();
  }
  getImageDataList(){
    c.drawImage(victim,this.x,this.y,victim.width,victim.height);
    for(let y = this.y; y < this.y + victim.height; y+=4){
      for(let x = this.x; x < this.x + victim.width; x+=4){
        this.imgData.push(c.getImageData(x,y,4,4));
        this.imgCoord.push({x:x,y:y});
        this.imgVel.push({
          dx:(Math.random() - 0.5) * this.speed,
          dy:(Math.random() - 0.5) * this.speed
        });
      }
    }
  }
  move(){
    for(let i = 0; i < this.imgCoord.length; i++){
      this.imgCoord[i].x += this.imgVel[i].dx;
      this.imgCoord[i].y += this.imgVel[i].dy;
    }
  }
  draw(){
    c.beginPath();
    for(let i = 0; i < this.imgData.length; i++){
      c.putImageData(this.imgData[i],this.imgCoord[i].x,this.imgCoord[i].y);
    }
    c.closePath();
  }
  render(){
    this.draw();
    this.move();
  }
}

window.onload = () => {
  const thanos = new Thanos();

  const animate = () => {
    requestAnimationFrame(animate);
    // c.clearRect(0,0,cv.width,cv.height);
    thanos.render();
  };
};