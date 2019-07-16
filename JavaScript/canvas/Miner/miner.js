let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = 600;
cv.height = 400;

let map = [], box = 20;
let w = cv.width / box;
let h = cv.height / box;
let start = undefined;
// The item value
const STONE = 0;
const BOOM = 2; // the boom will kill you instanlly
const SPIKE = 3; // Lost 1 heart when you touch the spike
const HEART = 4; // revive 1 heart - max heart = 3
const DIAMOND = 5; // if this diamond is found, you will win the game
// Graphics for the game
const Stone = new Image();
const Miner = new Image();
const Boom = new Image();
const Spike = new Image();
const Heart = new Image();
const Diamond = new Image();
// Create and draw the blank map - give the source for those graphics
function InitMap(){
  for(var y = 0; y < h; y++){
    map[y] = [];
    map[y].length = w;
    map[y].fill(0);
  }
  Stone.src = "stone.png";
  Miner.src = "miner.png";
  Boom.src = "boom.png";
  Spike.src = "spike.png";
  Heart.src = "heart.png";
  Diamond.src = "diamond.png";
  console.log(map);
}

function DrawMap(){
  c.beginPath();
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      c.drawImage(Stone,x * box,y * box,box,box);
    }
  }
  c.closePath();
}

// Class the Miner guy
class MinerGame {
  constructor() {
    this.x = 0; this.dx = 0; 
    this.y = 0; this.dy = 0;
    this.ox = this.x; this.oy = this.y;
    this.heart = 3;
    this.alive = true;
    this.found_diamond = false;
  }

  drawMiner(){
    c.beginPath();
    c.drawImage(Miner, this.x * box, this.y * box, box, box);
    c.closePath();
  }

  resetPlatForm(){
    c.clearRect(this.ox*box,this.oy*box,box,box);
    this.ox = this.x; this.oy = this.y;
  }

  render = () => {
    this.resetPlatForm();
    this.drawMiner();
    this.x += this.dx;
    this.y += this.dy;
    this.dx = this.dy = 0;
  };
}

InitMap();
window.onload = () => {
  DrawMap();
  let Game = new MinerGame();
  start = setInterval(Game.render,100);
  window.addEventListener("keydown",(e)=>{
    switch (e.keyCode) {
      case 37: // left
        Game.dx = -1;
        break;
      case 38: // Up
        Game.dy = -1;  
        break;
      case 39: // Right
        Game.dx = 1;
        break;
      case 40: // Down
        Game.dy = 1;
        break;
    }
  });
}

