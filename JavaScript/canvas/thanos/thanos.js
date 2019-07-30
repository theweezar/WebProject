const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = 1000;
cv.height = 500;

const victim = new Image();
victim.src = "victim.png";
victim.width = 200;
victim.height = 200;

class Thanos{
  constructor() {
    this.x = 300;
    this.y = 50;
    this.imgData = this.getImageDataList();
  }
  getImageDataList(){
    let data = [];
    c.beginPath();
    c.drawImage(victim,this.x,this.y,victim.width,victim.height);
    for(var y = this.y; y < this.y + victim.height; y+=4){
      for(var x = this.x; x < this.x + victim.width; x+=4){
        data.push(c.getImageData(x,y,4,4));
      }
    }
    c.closePath();
    return data;
  }
  draw(){
    c.putImageData(this.imgData[0],5,5);
    console.log(this.imgData[0]);
  }
}

window.onload = () => {
  const thanos = new Thanos();
  thanos.draw();
};