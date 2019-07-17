const cv1 = document.getElementById("cv1");
const cv2 = document.getElementById("cv2");
const cv3 = document.getElementById("cv3");
const c1  = cv1.getContext("2d");
const c2  = cv2.getContext("2d");
const c3  = cv3.getContext("2d");

cv1.width = cv2.width = cv3.width = 900;
cv1.height = cv2.height = cv3.height =  600;

let map = [], trapX = [], trapY = [] ;
let start = undefined;
const box = 30;
const w = cv1.width / box; // 600 / 20 = 30
const h = cv1.height / box; // 400 / 20 = 20
const BoomDetect = document.getElementById("boom-detect");
const SpikeDetect = document.getElementById("spike-detect");
const HeartInfo = document.getElementById("heart-infor");
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
const Ground = new Image();
// Create and draw the map - give the source for those graphics

function Make_A_Random_Array(len=0){
  let arr = [];
  for(var i = 0; i < len; i++){
    arr.push(i);
  }
  for(var k = 0; k < len - 1; k++){
    let pos = Math.floor(Math.random()*(len - (k+1)) + k+1);
    let tmp = arr[k];
    arr[k] = arr[pos];
    arr[pos] = tmp;
  }
  return arr;
}

function InitMap(){
  // Create a blank map fill with 0
  for(var y = 0; y < h; y++){
    map[y] = [];
    map[y].length = w;
    map[y].fill(0);
  }
  // Get the src for graphis
  Stone.src = "stone.png";
  Miner.src = "miner.png";
  Boom.src = "boom.png";
  Spike.src = "spike.png";
  Heart.src = "heart.png";
  Diamond.src = "diamond.png";
  Ground.src = "obsidian.png";
  // Create COORD for trap
  for(var i = 0; i < 3; i++){
    trapX = trapX.concat(Make_A_Random_Array(w));
    trapY = trapY.concat(Make_A_Random_Array(h));
  }
  
  // Add trap in the map
  for(var i = 0; i < trapY.length; i++){
    map[trapY[i]][trapX[i]] = Math.floor(Math.random()*(4+1-2)+2); // Random COORD + Random Traps
  }
  // ================== //
  console.log(map);
  console.log(trapX);
  console.log(trapY);
}

function DrawGround(){
  c1.beginPath();
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      c1.drawImage(Ground,x * box,y * box,box,box);
    }
  }
  c1.closePath();
}

function DrawTrap(){
  c2.beginPath();
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      if (map[y][x] !== 0){
        switch(map[y][x]){
          case BOOM:
            c2.drawImage(Boom,x * box,y * box,box,box);
            break;
          case SPIKE:
            c2.drawImage(Spike,x * box,y * box,box,box);
            break;
          case HEART:
            c2.drawImage(Heart,x * box,y * box,box,box);
            break;
        }
      }
    }
  }
  c2.closePath();
}

function DrawHeart(){
  HeartInfo.innerText = 3;
}

function RemoveHeart(x=0,y=0){
  c2.clearRect(x*box,y*box,box,box);
}

function DrawStone(){
  c3.beginPath();
  for(var y = 0; y < h; y++){
    for(var x = 0; x < w; x++){
      c3.drawImage(Stone,x * box,y * box,box,box);
    }
  }
  c3.closePath();
}

// Class the Miner guy
class MinerGame {
  constructor() {
    this.x = 0; this.dx = 0; 
    this.y = 0; this.dy = 0;
    this.ox = this.x; this.oy = this.y;
    this.autoX = [1, 1,1,0, 0,-1,-1,-1]; // Áp dụng bài toán tương tự con mã đi tuần để tìm đường đi tiếp theo
    this.autoY = [1,-1,0,1,-1, 1,-1, 0]; // 
    this.heart = 3;
    this.alive = true;
    this.found_diamond = false;
    this.checking = true;
  }

  drawMiner(){
    c3.beginPath();
    c3.drawImage(Miner, this.x * box, this.y * box, box, box);
    c3.closePath();
  }

  resetPlatForm(){
    c3.clearRect(this.ox*box,this.oy*box,box,box);
    this.ox = this.x; this.oy = this.y;
  }

  control(){
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > w - 1) this.x = this.ox;
    if (this.y < 0 || this.y > h - 1) this.y = this.oy;
    this.dx = this.dy = 0;
  }

  endGame(){
    if (!this.alive){
      clearInterval(start);
      document.getElementById("infor").innerHTML = "<h1 class='dead'>You are dead</h1>";
    }
    else if (this.found_diamond) console.log("yeah");
  }

  checkTrap(){
    if (this.checking){
      this.checking = false; // chỉ checking 1 lần cho 1 bước đi, nếu ko sẽ bị lag
      for(var i = 0; i < this.autoX.length; i++){
        // chạy vòng lặp ra xung quanh thằng miner theo 8 hướng - nếu hướng nào đó mà lọt ra ngoài map thì sẽ bỏ qua
        let tmpX = this.x + this.autoX[i];
        let tmpY = this.y + this.autoY[i];
        if (tmpX >= 0 && tmpX < w && tmpY >= 0 && tmpY < h){
          let check = map[tmpY][tmpX];
          if (check !== 0){
            switch(check){
              case BOOM:
                BoomDetect.innerText = "BOOM is nearby";
                break;
              case SPIKE:
                SpikeDetect.innerText = "Spikes is nearby";
                break;
            }
          }
        }
      }
    }
  }

  touchTrap(){
    if (map[this.y][this.x] !== 0){
      switch(map[this.y][this.x]){
        case BOOM:
          this.alive = false;
          this.resetPlatForm();
          this.drawMiner();
          break;
        case SPIKE:
          this.heart -= 1;
          // if you touch the spike, you will lost 1 heart and auto move to random location
          if (this.heart === 0) this.alive = false;
          else{
            let rand = Math.floor(Math.random()*(this.autoX.length - 0) + 0);
            this.resetPlatForm();
            this.x += this.autoX[rand];
            this.y += this.autoY[rand];
            if (this.x < 0 || this.x > w - 1){
              this.x = this.ox;
              this.x -= this.autoX[rand];
            }
            if (this.y < 0 || this.y > h - 1){
              this.y = this.oy;
              this.y -= this.autoY[rand];
            }
          }
          DrawHeart();
          break;
        case HEART:
          if (this.heart < 3){
            this.heart += 1;
            // The heart will disappear with you touch it - but when you are full HP, it won't
            map[this.y][this.x] = 0;
            RemoveHeart(this.x,this.y);
          }
          DrawHeart();
          break;
      }
    }
  }

  render = () => {
    this.resetPlatForm();
    this.drawMiner();
    this.endGame();
    this.control();
    this.checkTrap();
    this.touchTrap();
  };
}

InitMap();
window.onload = () => {
  DrawGround();
  DrawTrap();
  DrawStone();
  DrawHeart();
  let Game = new MinerGame();
  start = setInterval(Game.render,1);
  window.addEventListener("keydown",(e)=>{
    switch (e.keyCode) {
      case 37: // left
        Game.dx = -1; Game.checking = true;
        BoomDetect.innerText = "";
        SpikeDetect.innerText = "";
        break;
      case 38: // Up
        Game.dy = -1; Game.checking = true;
        BoomDetect.innerText = "";
        SpikeDetect.innerText = "";
        break;
      case 39: // Right
        Game.dx = 1; Game.checking = true;
        BoomDetect.innerText = "";
        SpikeDetect.innerText = "";
        break;
      case 40: // Down
        Game.dy = 1; Game.checking = true;
        BoomDetect.innerText = "";
        SpikeDetect.innerText = "";
        break;
    }
  });
}

