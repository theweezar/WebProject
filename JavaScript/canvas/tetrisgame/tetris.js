let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = 300;
cv.height = 400;

let board = [], box = 20;
let width = cv.width / box;
let height = cv.height / box;
let start ; // interval
function InitBoard(){
  for(var row = 0; row < height; row++){
    board[row] = [];
    board[row].length = width;
    board[row].fill(0);
  }
}

function Shape(){
  this.block = [
    [0,0,0],
    [0,1,0],
    [1,1,1]
  ];
  this.x = 5;
  this.y = 1;
  this.ox = this.x; // old x, old y
  this.oy = this.y;
  this.draw = () => {
    c.beginPath();
    c.fillStyle = "cornflowerblue";
    for(var y = 0; y < this.block.length; y++){
      for(var x = 0; x < this.block[y].length; x++){
        if (this.block[y][x] === 1){
          c.fillRect((this.x + x)*box,(this.y + y)*box,box,box);
        }
      }
    }
    c.closePath();
  }
  this.clear = () => {
    c.clearRect(this.ox*box,this.oy*box,this.block[0].length*box,this.block.length*box);
    this.ox = this.x; // old x, old y
    this.oy = this.y;
  }
  this.moveleft = () => {
    if (this.x !== 0) this.x -= 1;
  }
  this.moveright = () => {
    if (this.x !== width - this.block[0].length) this.x += 1;
  }
  this.falldown = () => {
    this.y += 1;
  }
  this.update = () => {
    this.clear();
    // this.falldown();
    this.merge_with_board();
    this.draw();
  }
  this.merge_with_board = () => {
    if (this.y + this.block.length === height){
      for(var y = 0; y < this.block.length; y++){
        for(var x = 0; x < this.block[y].length; x++){
          if (this.block[y][x] === 1){
            
          }
        }
      }
      console.log(`x = ${this.x} | y = ${this.y}`);
      clearInterval(start);
    }
  }
}

function Game(){
  this.shape = new Shape();
  this.run = () => {
    this.shape.update();
  }
}

InitBoard();
let game = new Game();

window.addEventListener("keydown",(e)=>{
  switch (e.keyCode) {
    case 37: // left
      game.shape.moveleft()
      break;
    case 38: // Up
      
      break;
    case 39: // Right
      game.shape.moveright();
      break;
    case 40: // Down
      game.shape.falldown();
      break;
    default:
      break;
  }
})

window.addEventListener("keyup",(e)=>{
  // game.shape.dx = game.shape.dy = 0;
})

start = setInterval(game.run,1000/60);