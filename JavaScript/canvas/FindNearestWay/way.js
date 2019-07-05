var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

function Wall(x,y,wall,color){
    this.x = x;
    this.y = y;
    this.r = 1;
    this.wall = wall;
    this.color = color;

    this.update = function(){
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

let AllWall=[],range=100, w=200,h=200;

function Init(){
    for(var i=range;i<=h;i+=20){ // Loop for y
        for(var j=range;j<=w;j+=20){ // Loop for x
            if (i==range && j==range || i>=h && j>=w){
                AllWall.push(new Wall(j,i,1,"yellow"));
            }
            else{
                var t2 = Math.floor(Math.random()*2+1);
                // console.log(t2);
                if (t2==2) AllWall.push(new Wall(j,i,0,"black")); // Wall
                else AllWall.push(new Wall(j,i,1,"yellow"));      // Path
                console.log(i+"|"+j);
            }
        }   
    }
}

function Run(){
    requestAnimationFrame(Run);
    // c.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<AllWall.length;i++){
        AllWall[i].update();
    }
}

function Me(x,y,color,curp,newp){
    this.x = x;
    this.y = y;
    this.color = color;
    this.curp = curp;
    this.newp = newp;
}
// Init();
// Run();