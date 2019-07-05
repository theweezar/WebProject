let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d"), img_craft = new Image(), img_fb = new Image();
img_craft.src = "spaceship.png";
img_fb.src = "fireball.png";
canvas.height =  600;
canvas.width =  innerWidth;

// let realheight = canvas.height/box, realwidth = canvas.width/box;
function Distance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

function COORD(x,y){
    this.x = x;
    this.y = y;
}
let mouse={
    'x':undefined,
    'y':undefined
};
document.addEventListener("mousemove",function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse);
})
function Ship(){ // Object ship
    this.x = canvas.width/2-30; // 30 là cái width của ship
    this.y = canvas.height-100;
    this.box = 30;

    this.update = function(){
        this.draw();
        this.x = mouse.x;
        this.y = mouse.y;
    }

    this.draw = function(){
        c.beginPath();
        c.drawImage(img_craft,this.x,this.y,this.box,this.box*2);
        c.closePath();
    }
}
function Fireball(){ // Object FireBall
    this.x = Math.floor(Math.random()*canvas.width);
    this.y = -Math.floor(Math.random()*(200-50)+50);
    this.speed = Math.floor(Math.random()*(8-2)+2);
    this.box = Math.floor(Math.random()*100+10);

    this.update = function(){
        this.draw();
        this.y += this.speed;
        if(this.y>canvas.height){
            this.x = Math.floor(Math.random()*canvas.width);
            this.y = -Math.floor(Math.random()*(200-50)+50);
            this.box = Math.floor(Math.random()*100+10);
            this.speed = Math.floor(Math.random()*(8-2)+2);
        }
        this.gameover();
    }

    this.gameover = function(){
        if (Distance(this.x,this.y,ship.x,ship.y)<=this.box/1.5 && this.x-ship.x < ship.box/3 && this.y-ship.y < ship.box) window.cancelAnimationFrame(start);
        // vẽ biểu đồ ra xog tự cho ví dụ rồi tự hiểu :))
        // if (ship.x - this.x > 0 && ship.x - this.x < this.box/1.5 && ship.y - this.y > 0 && ship.y - this.y < this.box/1.5) cancelAnimationFrame(start);
    }
    this.draw = function(){
        c.beginPath();
        
        c.drawImage(img_fb,this.x,this.y,this.box,this.box);
        c.closePath();
    }
}

let ship, fireball=[], amount = 40,start;
function init(){
    ship = new Ship();
    // fireball = new Fireball();
    for(i=0;i<amount;i++){
        fireball.push(new Fireball());
    }
}

function play(){
    start = requestAnimationFrame(play);
    c.clearRect(0,0,canvas.width,canvas.height);
    ship.update();
    // fireball.update();
    for(i=0;i<fireball.length;i++){
        fireball[i].update();
    }
    // console.log(fireball);
}
let o=true;

init();  
play();
// var game = setInterval(play,100);
