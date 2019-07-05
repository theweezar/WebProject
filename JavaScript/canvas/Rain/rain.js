var canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight-4;

var c = canvas.getContext("2d");

var mouse = {
    "x":undefined,
    "y":undefined
};

window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})

function Drops(x,y,z,speed,color){
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = speed;
    this.color = color;
    this.old_color = color;

    this.update = function(){
        if (this.y > canvas.height){
            this.y = Math.floor(Math.random()*-200-100);
        }
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100){
            this.color = "black";
        }else this.color = this.old_color;
        this.y+=speed;
        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(this.x,this.y,2,30);
        c.stroke();
        c.closePath();
    }
}

var DropList = [],
    amount = 150;

for(var i=0;i<amount;i++){
    var x = Math.floor(Math.random()*canvas.width),
        y = Math.floor(Math.random()*canvas.height),
        z = Math.floor(Math.random()*3+2),
        speed = Math.floor(Math.random()*5+3);
        if (z==1) color = "dodgerblue";
        else if (z==2) color = "rgba(30, 143, 255, 0.7)";
        else if (z==3) color = "rgba(30, 143, 255, 0.4)";
    var ADrop = new Drops(x,y,z,speed,color);
    DropList.push(ADrop);
}
function RainGoDown(){
    requestAnimationFrame(RainGoDown);
    c.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<DropList.length;i++){
        DropList[i].update();
    }
    // console.log("Running");
}
RainGoDown();

