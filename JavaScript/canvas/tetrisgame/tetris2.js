let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = 300;
cv.height = 400;

let board = []; 
const box = 50;
const width = cv.width / box;
const height = cv.height / box;
let start ; // interval

class Block {
  constructor(x = 0, y = 0) {
    this.x = this.ox = x;
    this.y = this.oy = y;
    this.matrix = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0]
    ];
    this.sX = this.calcX();
    this.sY = this.calcY();
    this.lenX = this.calcLengthX();
    this.lenY = this.calcLengthY();
  }
  calcLengthY(){ // tìm độ dài y thực của block
    for (let i = this.matrix.length - 1; i >= 0; i--) {
      if (this.matrix[i].some(b => { return b === 1; })) {
        console.log(`Real y length = ${i + 1 - (this.sY - this.y)}`);
        return i + 1 - (this.sY - this.y);
      }
    }
  }
  calcY(){ // tìm vị trí y đầu tiên thực của block
    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i].some(e => { return e === 1; })) {
        return this.y + i;
      }
    }
  }
  calcLengthX(){ // tìm độ dài x thực của block
    for (let i = this.matrix.length - 1; i >= 0; i--) {
      let colX = this.matrix.map(row => {
        return row[i];
      });
      if (colX.some(e => { return e === 1; })) {
        console.log(`Real x length = ${i + 1 - (this.sX - this.x)}`);
        return i + 1 - (this.sX - this.x);
      }
    }
  }
  calcX(){ // tìm vị trí x đầu tiên thực của block
    for (let i = 0; i < this.matrix.length; i++) {
      let colX = this.matrix.map(row => {
        return row[i];
      });
      if (colX.some(e => { return e === 1; })) {
        return this.x + i;
      }
    }
  }
  rotate(){
    // for()
    // cột = hàng
    // hoặc là hàng = cột
  }
  clear(){

  }
  draw(){
    c.beginPath();
    c.fillStyle = "cornflowerblue";
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] === 1) {
          c.fillRect((this.x + x) * box, (this.y + y) * box, box, box);
        }
      }
    }
    c.closePath();
  }
  drawXY(){
    c.beginPath();
    c.fillStyle = "red";
    c.fillRect(this.x * box, this.y * box, 5, 5);
    c.closePath();
  }
  drawsXY(){
    c.beginPath();
    c.fillStyle = "purple";
    c.fillRect(this.sX * box, this.sY * box, 5, 5);
    c.closePath();
  }
}

class Game{
  constructor() {
    this.b = new Block();
  }
  run(){

  }
}


let b = new Block();
b.draw();
b.drawXY();
b.drawsXY();