let cv = document.querySelector("canvas");
let c= cv.getContext("2d");
cv.height = innerHeight-10;
cv.width = innerWidth;

// c.translate(cv.width/2,cv.height/2); // giống như trong css

let mouse = {
    x:undefined,
    y:undefined
};

document.addEventListener("mousemove",function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

function Spin(color){
    this.degree = Math.floor(Math.random()*(360-0)+0);
    this.omega = (this.degree*Math.PI) / 180 ; // Tọa độ gốc - tức là tọa độ của gốc giữa x và bán kính (R mặc định là 1)
    this.x = cv.width/2; // ví dụ R = 100, thì di chuyển từ cv.w+-100
    this.y = cv.height/2;
    this.border = 5; // bán kính của những vòng tròn nhỏ
    this.DistanceFromCenter = {x:Math.floor(Math.random()*(150-50)+50),y:Math.floor(Math.random()*(150-50)+50)};
    this.old_point;
    this.lineW = Math.floor(Math.random()*(3-1)+1);
    this.color = color;
    // Dùng để vẽ eclipse - hình tròn méo nên x và y ko bằng nhau

    this.update = function(){
        this.process();
        this.draw();
    }

    this.process = function(){
        this.old_point = {x:this.x,y:this.y};
        this.degree+=5;
        this.omega = (this.degree*Math.PI) / 180;
        this.x = mouse.x + Math.cos(this.omega)*this.DistanceFromCenter.x; // ví dụ R = 100, thì di chuyển từ cv.w+-100
        this.y = mouse.y + Math.sin(this.omega)*this.DistanceFromCenter.y; // Nếu dùng scale thì là 0 +- 100;
        if (this.degree == 360) this.degree = 0;
    }

    this.draw = function(){
        c.beginPath();
        // c.fillStyle = "blue";
        c.strokeStyle = this.color;
        c.lineWidth = this.lineW;
        c.moveTo(this.old_point.x,this.old_point.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        // c.fill();
        c.closePath();
    }
    
}

let start, spin=[], amount=30,color=["aqua","blueviolet","chartreuse","orangered"];

function init(){
    for(i=0;i<amount;i++){
        spin.push(new Spin(color[Math.floor(Math.random()*(color.length-0)+0)]));
    }
}

function animate(){
    start = requestAnimationFrame(animate);
    c.fillStyle = "rgba(255,255,255,0.2)"; // cái này tạo đường nét mờ,
    // giải thích vì liên tục đắp lên những tấm trắng mờ, nên những điểm cũ liên tục bị phai dần
    c.fillRect(0,0,cv.width,cv.height);
    // c.clearRect(0,0,cv.width,cv.height);
    for(i=0;i<spin.length;i++){
        spin[i].update();
    }
}
init();
animate();