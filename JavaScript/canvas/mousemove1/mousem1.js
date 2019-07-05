let cv = document.querySelector("canvas");
let c=cv.getContext("2d");

cv.width = innerWidth;
cv.height = innerHeight-5;

let mouse = {
    x:cv.width/2,
    y:cv.height/2
};
let rgb = ["173, 216, 230","255, 255, 0","255,255,255","128, 0, 128","0, 255, 255",
            "255, 0, 0","255, 165, 0","255, 69, 0","65, 105, 225"];
//"173, 216, 230","255, 255, 0","255,255,255","128, 0, 128","0, 255, 255","255, 0, 0","255, 165, 0","255, 69, 0","65, 105, 225"
let colors=['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

window.addEventListener("mousemove",function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

function Star(x,y,timer){
    this.x_first = x;
    this.y_first = y;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random()*(25-15)+15);
    this.first_r = this.r;
    this.speed = Math.floor(Math.random()*(5-3)+3);
    this.omega = (Math.floor(Math.random()*(360-0)+0) * Math.PI) / 180;
    this.dx = Math.cos(this.omega) * this.speed;
    this.dy = Math.sin(this.omega) * this.speed;
    this.start = 0;
    this.timer = timer;//Math.floor(Math.random()*(25-5)+5);
    this.color = "white";//"rgba(255,255,255,0.4)";
    this.changed_color = false;

    this.update = function(){
        this.draw();
        if (this.r < this.first_r-5 && !this.changed_color){
            this.color = colors[Math.floor(Math.random()*(colors.length-0)+0)];//"rgba(" + rgb[Math.floor(Math.random()*(rgb.length-0)+0)] + ",0.6)";
            this.changed_color = true;
        }
        
        if (this.start < this.timer ) this.start += 1;
        else{
            this.x += this.dx;
            this.y += this.dy;
            this.dx += (0.5 - Math.random());
            this.dy += (0.5 - Math.random());
            this.r -= Math.random()*(0.9-0.7)+0.7;
        }
    }

    this.draw = function(){
        c.beginPath();
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.stroke();
        c.fill()
        c.closePath();
    }
}

function Mousemove(){
    this.old_mousexy = {x:mouse.x,y:mouse.y};
    this.star = [];
    this.max_star = 300;

    this.detect_motion = function(){
        if (this.old_mousexy.x != mouse.x || this.old_mousexy.y != mouse.y){
            // console.log("motion detected");
            if (this.star.length < this.max_star){
                for(i=0;i<4;i++){
                    this.star.push(new Star(mouse.x,mouse.y,i));
                }
            }
        }
        this.old_mousexy = {x:mouse.x,y:mouse.y};
    }
    
    this.update = function(){
        this.detect_motion();
        for(i=0;i<this.star.length;i++){
            this.star[i].update();
            if (this.star[i].r <= 1) this.star.splice(i,1);
        }
    }
    
}

let mm = new Mousemove(); 

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,cv.width,cv.height);
    mm.update();
}

animate();