let cv = document.querySelector("canvas");
let c = cv.getContext("2d");

cv.height = innerHeight - 5;
cv.width = innerWidth;

function Distance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

function DrawBoard(){
    c.beginPath();
    c.fillStyle = "black";
    c.fillRect(0,0,cv.width,cv.height);
    c.closePath();
}

let rgb = ["148, 0, 211","75, 0, 130","0, 0, 255","0, 255, 0","255, 255, 0","255, 127, 0","255, 0 , 0"];

function COORD(x,y){
    this.omega = (Math.floor(Math.random()*(360-0)+0) * Math.PI) / 180; // cos sin sẽ ở giữa -1 và 1
    this.x = x;
    this.y = y;
    this.DistanceFromCenter = {x:Math.floor(Math.random()*(60-35)+35),y:Math.floor(Math.random()*(60-35)+35)};
    this.max_react = Math.floor(Math.random()*(70-30)+30);
    this.last_pos={x:this.x,y:this.y};
    this.fade = 1;
    this.w = Math.floor(Math.random()*(2-1)+1);
    this.rgb = rgb[Math.floor(Math.random()*(rgb.length-0)+0)];

    this.draw_particles = function(){
        c.beginPath();
        c.lineWidth = this.w;
        c.moveTo(this.last_pos.x,this.last_pos.y);
        c.lineTo(this.x,this.y);
        c.strokeStyle = "rgba(" + this.rgb + "," + this.fade + ")"; 
        c.stroke();
        c.closePath();
    }
}

function Firework(){
    this.x = Math.floor(Math.random()*1300+20);
    this.y = cv.height+80;
    this.v = - Math.floor(Math.random()*(28-22)+22); // vận tốc. Đi lên là - đi xuống là +
    this.a = 0.75; // gia tốc
    this.r = 2;
    this.exploded = false;
    this.particles=[];
    this.par_fade = 1;
    
    this.update = function(){
        if (!this.exploded){
            this.fly();
            this.draw_this_firework();
        }
        else{
            this.particles_fall_down();
        }
        // console.log(this.v);
    }

    this.fly = function(){
        this.v+=this.a;
        this.y+=this.v;
        if (this.v > 0){
            this.exploded = true;
            this.explode();
        }
        
    }

    this.explode = function(){
        for(i=0;i<40;i++){
            this.particles.push(new COORD(this.x,this.y));
        }
    }
    this.particles_fall_down = function(){
        for(i=0;i<this.particles.length;i++){
            this.particles[i].draw_particles();
            
            if (Distance(this.particles[i].x,this.particles[i].y,this.x,this.y) <= this.particles[i].max_react){
                this.particles[i].last_pos = {x:this.particles[i].x,y:this.particles[i].y};
                this.particles[i].x += (Math.cos(this.particles[i].omega)*this.particles[i].DistanceFromCenter.x)/15;
                this.particles[i].y += (Math.sin(this.particles[i].omega)*this.particles[i].DistanceFromCenter.y)/15;
            }
            else{
                this.particles[i].x += 0.5 - Math.random();
                this.particles[i].y += this.v;
            }
            if (this.particles[i].fade!=0) this.particles[i].fade-=0.05;
        }
        this.y += this.v;
        this.v += 0.05;
        if (this.par_fade > 0) this.par_fade-=0.05; // track theo những particles fade để tạo mới
        else{
            this.exploded = false;
            this.particles.length = 0;
            this.x = Math.floor(Math.random()*1300+20);
            this.y = cv.height+80;
            this.v = - Math.floor(Math.random()*(28-22)+22);
            this.par_fade = 1;
        } 
    }

    this.draw_this_firework = function(){
        c.beginPath();
        c.fill();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.strokeStyle = "red";
        c.fillStyle = "red";
        c.stroke();
        c.fill();
        c.closePath();
    }

    
}

let fws=[] , start, amount=1;
function init(){
    for(i=0;i<amount;i++){
        fws.push(new Firework());
    }
}

function run(){
    start = requestAnimationFrame(run);
    // c.clearRect(0,0,cv.width,cv.height);
    c.fillStyle = "rgba(255,255,255,0.25)";
    c.fillRect(0,0,cv.width,cv.height);
    // DrawBoard();
    for(i=0;i<fws.length;i++){
        fws[i].update();
    }
}

init();
run();