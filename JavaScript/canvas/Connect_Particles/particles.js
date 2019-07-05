var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse ={
    x:undefined,
    y:undefined
},mouse_r = 40;
window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

function Distance(x1,y1,x2,y2){
    var s = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
    return s;
}

function Particle(x,y,r){
    this.x = x;
    this.y = y;
    this.dx = Math.random()-0.5;
    this.dy = Math.random()-0.5;
    this.r = r;

    this.update = Particles => { // Khi mảng dc truyền vào, thì thằng this này sẽ có thể dùng dữ liệu của toàn
        this.draw();             // bộ dữ liệu cửa toản bộ phần tử trong mảng Particles để so sánh
        for(var i=0;i<Particles.length;i++){
            if (this === Particles[i]) continue;
            if (Distance(this.x,this.y,Particles[i].x,Particles[i].y)<=range){
                this.drawline(Particles[i].x,Particles[i].y,"rgba(255,0,0,0.5)");
            }
            if (Distance(this.x,this.y,Particles[i].x,Particles[i].y)<range+20){
                this.drawline(Particles[i].x,Particles[i].y,"rgba(0,255,0,0.2)");
            }
            if (Distance(this.x,this.y,Particles[i].x,Particles[i].y)<range+40){
                this.drawline(Particles[i].x,Particles[i].y,"rgba(0,0,255,0.1)");
            }
            // if (Distance(mouse.x,mouse.y,Particles[i].x,Particles[i].y)<=100){
            //     this.drawlinemouse(Particles[i].x,Particles[i].y);
            // }
        }
        if (this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = - this.dx;
        }
        if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.dy = - this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
    }

    // this.drawlinemouse = function(xIn,yIn){
    //     c.beginPath();
    //     c.moveTo(mouse.x,mouse.y);
    //     c.lineTo(xIn,yIn);
    //     c.strokeStyle = "rgba(255,255,255,0.5)";
    //     c.stroke();
    //     c.closePath();
    // }

    this.drawline = function(xIn,yIn,linecolor){
        c.beginPath();
        c.moveTo(this.x,this.y);
        c.lineTo(xIn,yIn);
        c.strokeStyle = linecolor;//"rgba(255,255,255,0.5)";
        c.stroke();
        c.closePath();
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.strokeStyle = "rgba(255,255,255,0.7)";
        c.fillStyle = "rgba(255,255,255,0.7)";
        c.stroke();
        c.fill();
        c.closePath();
    }
}

let Particles=[],
    amount=150,
    range = 50,  // Khoảng cách của từng hạt
    Mousecircle;

function KhoiTao(){
    // Particles;
    var r=3, spawnW = canvas.width - 2*r, spawnH = canvas.height - 2*r;
    for(var i=0;i<amount;i++){
        var x = Math.floor(Math.random()*spawnW+r),
            y = Math.floor(Math.random()*spawnH+r),
            par = new Particle(x,y,r);
        Particles.push(par);
        // console.log(par);
    }
    // Mousecircle = new Particle(undefined,undefined,mouse_r);
}

function Add(){
    var r=5;
    Particles.push(new Particle(mouse.x,mouse.y,r));
}
window.addEventListener("click",Add);
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    // for(var i=0;i<Particles.length;i++){
    //     Mousecircle.x = mouse.x;
    //     Mousecircle.y = mouse.y;
    //     Mousecircle.update();
    //     Particles[i].update();
    //     if (Distance(Mousecircle.x,Mousecircle.y,Particles[i].x,Particles[i].y)-(mouse_r+Particles[i].r)<=0){
    //         console.log("touch");
    //     }
    // }
    Particles.forEach(particle => {  // cho mỗi phần tử particle trong mảng, thì mỗi phần tử particle đó 
        particle.update(Particles); // thực hiện chức năng update (truyền cả mãng vào)
    })
}
KhoiTao();
animate();