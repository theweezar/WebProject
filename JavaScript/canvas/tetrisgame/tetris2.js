let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = 300;
cv.height = 400;

// let board = []; 
const box = 50;
const colors = ['orange','blue','lightblue','cornflowerblue','red','green','purple','black','darkcyan','pink'];
const width = cv.width / box;
const height = cv.height / box;
let start ; // interval

class Block {
  constructor(x = 0, y = 0) {
    this.x = this.ox = x;
    this.y = this.oy = y;
    this.matrix = [
      [0, 1, 0],
      [1, 1, 1],
    ];
    this.lenX = this.matrix[0].length;
    this.lenY = this.matrix.length;
    // this.color = colors[Math.floor(Math.random()*(colors.length-0)+0)];
    this.color = 'black';
    console.log(`Real y length = ${this.lenY}\nReal x length = ${this.lenX}`);
  }
  moveLeft(){
    if (!this.collisionLeft()){
      if (this.x !== 0) this.x -= 1;
    }
  }
  moveRight(){
    if (!this.collisionRight()){
      if (this.x + this.lenX < width) this.x += 1;
    }
  }
  fallDown(){
    if (this.y + this.lenY === height || this.collision()){
      console.log(`x: ${this.x} ; y: ${this.y}`);
      this.merge();
    }
    else this.y += 1;
  }
  rotate(){
    // cột = hàng
    this.clear();
    let newMatrix = [];
    for(let i = 0; i < this.matrix[0].length; i++){
      let colX = this.matrix.map(row => {
        return row[i];
      });
      newMatrix.push(colX.reverse());
    }
    this.matrix = newMatrix;
    console.log(newMatrix);
    this.lenX = this.matrix[0].length;
    this.lenY = this.matrix.length;
    // console.log(`Real y length = ${this.lenY}\nReal x length = ${this.lenX}`);
  }
  merge(){
    for(let i = 0; i < this.lenY; i++){
      for(let j = 0; j < this.lenX; j++){
        if (this.matrix[i][j] === 1){
          board[this.y + i][this.x + j] = 1;
        }
      }
    }
    this.fullRow();
    this.resetBlock();
    console.log(board);
  }
  collisionLeft(){
    for(let i = this.lenY - 1; i >= 0; i--){
      for(let j = this.lenX - 1; j >= 0; j--){
        if (this.matrix[i][j] === 1){
          if (board[this.y + i][this.x + j - 1] === 1) return true;
        }
      }
    }
  }
  collisionRight(){
    for(let i = this.lenY - 1; i >= 0; i--){
      for(let j = this.lenX - 1; j >= 0; j--){
        if (this.matrix[i][j] === 1){
          if (board[this.y + i][this.x + j + 1] === 1) return true;
        }
      }
    }
  }
  collision(){
    for(let i = this.lenY - 1; i >= 0; i--){
      for(let j = this.lenX - 1; j >= 0; j--){
        if (this.matrix[i][j] === 1){
          if (board[this.y + i + 1][this.x + j] === 1 // bottom + left + right
            || board[this.y + i + 1][this.x + j] === 1 && board[this.y + i][this.x + j - 1] === 1
            || board[this.y + i + 1][this.x + j] === 1 && board[this.y + i][this.x + j + 1] === 1
          ) return true;
        }
      }
    }
    return false;
  }
  resetBlock(){
    this.x = this.ox = 3;
    this.y = this.oy = 0;
    // this.color = colors[Math.floor(Math.random()*(colors.length-0)+0)];
    this.color = 'black';
  }
  fullRow(){
    let full = false;
    for(let i = height - 1; i > 0; i--){
      if (board[i].every(e => {return e === 1;})){
        for(let j = i - 1; j >= 0; j--){
          board[j + 1] = board[j];
        }
        i++;
        full = true;
      }
    }
    if (full) this.reDrawBoard();
  }
  reDrawBoard(){
    c.clearRect(0,0,width*box,height*box);
    c.beginPath();
    c.fillStyle = this.color;
    for(let i = height - 1; i >= 0; i--){
      for(let j = 0; j < width; j++){
        if (board[i][j] === 1){
          c.fillRect(j * box, i * box,box,box);
        }
      }
    }
    c.closePath();
  }
  clear(){
    for(let i = 0; i < this.lenY; i++){
      for(let j = 0; j < this.lenX; j++){
        if (this.matrix[i][j] === 1){
          c.clearRect((this.ox + j) * box, (this.oy + i) * box, box, box);
        }
      }
    }
    this.ox = this.x;
    this.oy = this.y;
  }
  draw(){
    c.beginPath();
    c.fillStyle = this.color;
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

}

function initBoard(){
  let board = [];
  for(let i = 0; i < height; i++){
    board.push([]);
    board[i].length = width;
    board[i].fill(0);
  }
  return board;
}

const board = initBoard();
const b = new Block();

function run(){
  b.clear();
  b.draw();
  b.drawXY();
}


window.addEventListener("keydown",(e)=>{
  switch (e.keyCode) {
    case 37: // left
      b.moveLeft();
      break;
    case 32: // Space - rotate
      b.rotate();
      break;
    case 39: // Right
      b.moveRight();
      break;
    case 40: // Down
      b.fallDown();
      break;
    default:
      break;
  }
  console.log(`x:${b.x}, y:${b.y}`);
})

start = setInterval(run,1000/60);