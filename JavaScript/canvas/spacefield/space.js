let cv = document.querySelector("canvas");
let c = cv.getContext("2d");

cv.height = innerHeight - 5;
cv.width = innerWidth;

function DrawBoard(){
    c.beginPath();
    c.fillStyle = "black";
    c.fillRect(0,0,cv.width,cv.height);
    c.closePath();
}

function Distance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

function COORD(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = 5;
    this.dx = (this.x - cv.width/2)/Distance(this.x,this.y,cv.width/2,cv.height/2);
    this.dy = (this.y - cv.height/2)/Distance(this.x,this.y,cv.width/2,cv.height/2);
    this.r = 1;//Math.abs(this.x - cv.width/2)/150;

    this.update = () => {
        this.draw();
        // this.x += this.dx;
        // this.y += this.dy;
        // this.r +=0.001; //Math.abs(this.x - cv.width/2)/150;

        this.x = (this.x - cv.width/2) * (100/this.z);
        this.x += cv.width/2;

        this.y = (this.y - cv.height/2) * (100/this.z);
        this.y += cv.height/2;

        this.r = 1 * (100/this.z);

        this.z -= 1000;
        if (this.x < 0 || this.x > cv.width || this.y < 0 || this.y > cv.height){
            this.x = Math.floor(Math.random()*(1250-20)+20);
            this.y = Math.floor(Math.random()*(600-20)+20);
            // this.dx = (this.x - cv.width/2)/Distance(this.x,this.y,cv.width/2,cv.height/2);
            // this.dy = (this.y - cv.height/2)/Distance(this.x,this.y,cv.width/2,cv.height/2);
            // this.r = 1;//Math.abs(this.x - cv.width/2)/150;
        }
    }
    this.draw = () => {
        c.beginPath();
        c.strokeStyle = "white";
        c.fillStyle = "white";
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.stroke();
        c.fill();
        c.closePath();
    }
}

let space = [], amt=100;
function Init(){
    var x,y,z;
    for(var i=0;i<amt;i++){
        x = Math.floor(Math.random()*(1250-20)+20);
        y = Math.floor(Math.random()*(600-20)+20);
        z = Math.floor(Math.random()*(50-0)+0);
        space.push(new COORD(x,y,z));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,cv.width,cv.height);
    DrawBoard();
    for(var i=0;i<space.length;i++){
        space[i].update();
    }
}

Init();
animate();