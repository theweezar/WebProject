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

function Game(){
  this.block = [
    [1,1,1],
    [0,1,0],
    [0,0,0]
  ];
  this.x = 5;
  this.y = 1;
  this.length_block_y = () => {
    let len = 0;
    for(var y = 0; y < this.block.length; y++){
      if (this.block[y].some(p => {return p === 1})) len++; 
      // hàm some sẽ return true : false nếu như có ít nhất phần tử hợp lệ với điều kiện
    }
    return len;
  }
  this.ox = this.x; // old x, old y
  this.oy = this.y;
  this.draw = () => {
    c.beginPath();
    c.fillStyle = "cornflowerblue";
    // c.strokeStyle = "black";
    for(var y = 0; y < this.block.length; y++){
      for(var x = 0; x < this.block[y].length; x++){
        if (this.block[y][x] === 1){
          c.fillRect((this.x + x)*box,(this.y + y)*box,box,box);
          // c.rect((this.x + x)*box,(this.y + y)*box,box,box);
          // c.stroke();
        }
      }
    }
    c.closePath();
  }
  this.clear = () => {
    c.clearRect(this.ox*box,this.oy*box,this.block[0].length*box,this.length_block_y()*box);
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
  this.reset_block = () => {
    this.x = this.ox = 5; this.y = this.oy = 0;
  }
  this.check_full_row = () => {
    for(var y = board.length - 1; y >= 0; y-- ){
      if ( board[y].every(pos => {return pos === 1}) ){ 
        // nếu dòng nào full 1 thì nó sẽ return true
        // cái return nó giống như là thằng nào === 1 thì nó return boolean về, áp dụng cho toàn bộ array
        board[y].fill(0);
        console.log("full row");
      }
    }
  }
  this.merge_with_board = () => {
    let max_y = this.length_block_y();
    if (this.y + max_y === height || this.collision()){
      for(var y = 0; y < max_y; y++){
        for(var x = 0; x < this.block[y].length; x++){
          if (this.block[y][x] === 1){
            board[this.y + y][this.x + x] = 1;
          }
        }
      }
      console.log(`x = ${this.x} | y = ${this.y}`);
      console.log(board);
      this.reset_block();
      // clearInterval(start);
    }
  }
  this.collision = () => {
    let max_y = this.length_block_y();
    if (board[this.y + max_y - 1][this.x + this.block[0].length - 1] === 1) return true;
    else if (board[this.y + max_y - 1][this.x - this.block[0].length - 1] === 1) return true;
  }
  this.rotation = () => {

  }
  this.run = () => {
    this.clear();
    // this.falldown();
    this.draw();
    this.merge_with_board();
    this.check_full_row();
  }
}

InitBoard();
let game = new Game();

window.addEventListener("keydown",(e)=>{
  switch (e.keyCode) {
    case 37: // left
      game.moveleft()
      break;
    case 38: // Up
      
      break;
    case 39: // Right
      game.moveright();
      break;
    case 40: // Down
      game.falldown();
      break;
    default:
      break;
  }
})

window.addEventListener("keyup",(e)=>{
  // game.shape.dx = game.shape.dy = 0;
})

start = setInterval(game.run,1000/60);