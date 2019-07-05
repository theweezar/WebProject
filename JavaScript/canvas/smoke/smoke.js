let cv = document.querySelector("canvas");
let c= cv.getContext("2d");

cv.height = window.innerHeight-5;
cv.width = window.innerWidth;

let mouse = {
    x:undefined,
    y:undefined
};

// window.addEventListener("mousemove",function(e){
//     mouse.x = e.x;
//     mouse.y = e.y;
// })

// window.addEventListener("click",function(e){
    
// })

function Particles(timer){
    this.x = cv.width/2;
    this.y = cv.height/1.4;
    this.omega = (Math.floor(Math.random()*(280-260)+260)*Math.PI)/180;
    this.r=5;
    this.max_r = Math.floor(Math.random()*(50-20)+20);
    this.speed = 2.5;
    this.dx = Math.cos(this.omega) * this.speed;
    this.dy = Math.sin(this.omega) * this.speed;
    this.start=0;
    this.timer = timer;
    this.fade = 1;
    this.rgb=0;
    this.update = function(){
        this.draw();
        if (this.start < this.timer) this.start += 1;
        else{
            this.x += this.dx;
            this.y += this.dy;
            this.fade -= 0.008;
            if (this.r < this.max_r) this.r += 0.75;
            if (this.fade < 0){
                this.x = cv.width/2;
                this.y = cv.height/1.4;
                this.omega = (Math.floor(Math.random()*(280-260)+260)*Math.PI)/180;
                this.r=5;
                this.max_r = Math.floor(Math.random()*(50-20)+20);
                this.dx = Math.cos(this.omega) * this.speed;
                this.dy = Math.sin(this.omega) * this.speed;
                this.start=0;
                this.fade = 1;
            }
        }
    }
    this.draw = function(){
        c.beginPath(); 
        c.strokeStyle = "rgba("+this.rgb+","+this.rgb+","+this.rgb+","+this.fade+")";
        c.fillStyle = "rgba("+this.rgb+","+this.rgb+","+this.rgb+","+this.fade+")";
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.stroke();
        c.fill();
        c.closePath();
    }   
}

function Smoke(){
    this.pars = [];
    this.amount = 40;

    this.create_par = function(){
        for(i=0;i<this.amount;i++){
            this.pars.push(new Particles(i*5));
        }
    }
    this.update = function(){
        for(i=1;i<this.pars.length;i++){
            this.pars[i].update();
        }
    }
}

let start = new Smoke(); start.create_par();

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,cv.width,cv.height);
    // c.fillStyle = "rgba(255,255,255,0.05)";
    // c.fillRect(0,0,cv.width,cv.height);
    start.update();
}
animate();