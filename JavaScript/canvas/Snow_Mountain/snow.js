var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function SnowDrop(x,y,z,r,dx,dy,color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.z = z;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.update = function(){
        if (this.x > canvas.width || this.x < 0){
            this.x = Math.floor(Math.random()*canvas.width);
            this.y = 0;
        }
        if (this.y > canvas.height){
            this.y = 0;
        }
        this.x+=this.dx; 
        this.y+=this.dy;
        this.draw();
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.stroke();
        c.fill();
        c.closePath();
    }
}

var Snow=[],amount = 500;
for(var i=0;i<amount;i++){
    var x = Math.floor(Math.random()*canvas.width),
        y = Math.floor(Math.random()*canvas.height),
        r = 1,
        dx = Math.random()-0.5,
        dy = Math.random()-0.5;
        z = Math.floor(Math.random()*3+1);
        if (dy<0) dy=-dy;
        if (z==1) var color = "rgba(255,255,255,1)";
        else if (z==2) var color = "rgba(255,255,255,0.7)";
        else if(z==3) var color = "rgba(255,255,255,0.3)";
    var drop = new SnowDrop(x,y,z,r,dx,dy,color);
    Snow.push(drop);
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<amount;i++){
        Snow[i].update();
    }
    // console.log("running");
}
animate();

function CurrentTime(){
    var current = new Date();
    var h = current.getHours(),
        m = current.getMinutes(),
        s = current.getSeconds();
    if (h<10) h="0"+h;
    if (m<10) m="0"+m;
    if (s<10) s="0"+s;
    document.getElementById("hh").innerText = h;
    document.getElementById("mm").innerText = m;
    document.getElementById("ss").innerText = s;
    setTimeout(CurrentTime,1000);
}
CurrentTime();