let cv = document.querySelector("canvas");
let c = cv.getContext("2d");

cv.height = innerHeight - 5;
cv.width = innerWidth;
// c.transform(0.5, .2, .5, 1, 0, 0);

function Distance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

function DrawBoard(){
    c.beginPath();
    c.fillStyle = "black";
    c.fillRect(0,0,cv.width,cv.height);
    c.closePath();
}

function rgba(r,g,b,a){
    return "rgba("+r+","+g+","+b+","+a+")";
}

let start, amt=15, fw=[];
let rgb = [
    {r:254, g:249, b:204},
    {r:255, g:165, b:0},
    {r:225, g:45, b:75},
    {r:91, g:189, b:200}
];

function Spot(x,y){
    this.first_x = x;
    this.first_y = y;
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*(10-3)+3);;
    this.max_reach = Math.floor(Math.random()*(30-1)+1);
    this.reached = false;
    this.omega = (Math.floor(Math.random()*(360-0)+0) * Math.PI)/180;
    this.dx = Math.cos(this.omega)*this.speed;
    this.dy = Math.sin(this.omega)*this.speed;
    this.r = 1;
    this.old_pos = {x:this.x,y:this.y};
    this.color = rgb[Math.floor(Math.random()*(rgb.length-0)+0)];

    this.update = (a) => {
        this.draw(a);
        this.old_pos = {x:this.x,y:this.y};
        this.x += this.dx*2;
        this.y += this.dy;
        if (!this.reached){
            if (Distance(this.x,this.y,this.first_x,this.first_y) > this.max_reach + 1){
                this.dx = this.dx / 2;
                this.r = 1;
                this.reached = true;
            }
            this.dy += 0.45;
        }
        else{
            this.dy += 0.25;
        }
    }

    this.draw = (a) => {
        c.beginPath();
        c.lineWidth = 2;
        c.strokeStyle = rgba(this.color.r,this.color.g,this.color.b,a);
        c.moveTo(this.old_pos.x,this.old_pos.y);
        c.lineTo(this.x,this.y);
        // c.fillStyle = rgba(this.color.r,this.color.g,this.color.b,a);
        // c.arc(this.x,this.y,1,0,Math.PI*2,false);
        c.stroke();
        // c.fill();
        c.closePath();
    }
}

function Particles(timer){
    this.x = Math.floor(Math.random()*(1250-50)+50);
    this.y = cv.height + 50;
    this.dy = -Math.floor(Math.random()*(20-15)+15);
    this.g = 0.32;
    this.start = 0;
    this.timer = timer;
    this.faded = 1;
    this.exploded = false;
    this.explosion = [];

    this.update = () =>{
        if (!this.exploded){
            this.draw();
            this.process_fly_up();
        }
        else this.process_explode();
    }

    this.process_fly_up = () =>{
        if (this.start < this.timer) this.start+=1;
        else{
            if (this.dy < 0){
                this.y += this.dy;
                this.dy += this.g;
            }
            else{
                this.exploded = true;
                for(i=0;i<50;i++){
                    this.explosion.push(new Spot(this.x,this.y));
                }
            }
        }
    }
    
    this.process_explode = () =>{
        for(i=0;i<this.explosion.length;i++){
            this.explosion[i].update(this.faded);
        }
        this.faded -= 0.028;
        if (this.faded < 0){
            this.x = Math.floor(Math.random()*(1250-50)+50);
            this.y = cv.height + 50;
            this.dy = -Math.floor(Math.random()*(20-15)+15);
            this.g = 0.32;
            this.start = 0;
            this.faded = 1;
            this.exploded = false;
            this.explosion.length=0;
        }
    }


    this.draw = () =>{
        c.beginPath();
        c.fillStyle = "white";
        c.strokeStyle = "white";
        c.arc(this.x,this.y,2,0,Math.PI*2,false);
        c.stroke();
        c.fill();
        c.closePath();
    }
}

function Init(){
    for(var i=0;i<amt;i++){
        fw.push(new Particles(i*10));
    }
}
DrawBoard();
function animate(){
    start = requestAnimationFrame(animate);
    // c.clearRect(0, 0, cv.width, cv.height);
    c.fillStyle="rgba(0,0,0,0.2)";
    c.fillRect(0,0,cv.width,cv.height);
    for(var i=0; i<fw.length; i++){
        fw[i].update();
    }
}
Init();
animate();