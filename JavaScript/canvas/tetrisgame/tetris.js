let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = 300;
cv.height = 400;

let board = [];
function InitBoard(){
  for(var row = 0; row < cv.height / 20; row++){
    board[row] = [];
    board[row].length = cv.width / 20;
    board[row].fill(0);
  }
}

function Shape(){
  this.shape = [
    [0,0,0],
    [0,1,0],
    [1,1,1]
  ];
}



window.onload = () => {
  InitBoard();
}