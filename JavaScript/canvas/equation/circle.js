let cv = document.querySelector("canvas");
let c= cv.getContext("2d");
cv.height = innerHeight-10;
cv.width = innerWidth;

c.translate(cv.width/2,cv.height/2); // giống như trong css

let percent = document.getElementById("percent");

function Loading(degree,R){ // degree = 270
    this.first_start = degree; 
    this.degree = degree;
    this.omega = (this.degree*Math.PI) / 180 ; // Tọa độ gốc - tức là tọa độ của gốc giữa x và bán kính (R mặc định là 1)
    this.R = R;
    this.x = Math.cos(this.omega)*this.R;
    this.y = Math.sin(this.omega)*this.R;
    this.border = 15; // bán kính của những vòng tròn nhỏ
    this.now = 0; // vị trí load tới đâu
    this.percent=0;
    

    this.update = function(){
        this.draw();
        this.draw_percent();
        this.process();
    }

    this.process = function(){
        if (this.degree == this.first_start+360) cancelAnimationFrame(start); // 270 + 360 = 630 (cộng thêm 1 hình tròn)
        this.degree += 1;
        this.omega = (this.degree*Math.PI) / 180;
        this.x = Math.cos(this.omega)*this.R;
        this.y = Math.sin(this.omega)*this.R;
        this.percent = Math.floor((++this.now/360)*100); 
        console.log(this.percent);
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.border,0,Math.PI*2,false);
        c.fillStyle = "lightblue";
        c.strokeStyle = "lightblue";
        c.stroke();
        c.fill();
        c.closePath();
    }
    
    this.draw_percent = function(){
        // percent.innerText = this.percent + "%";
        c.beginPath();
        c.fillStyle = "black";
        c.font='50px Comic Sans MS';
        c.textAlign = "center";
        c.fillText(this.percent + "%",10,10);
        c.closePath();
    }
}

let start, loading = new Loading(-90,150);

function animate(){
    start = requestAnimationFrame(animate);
    c.clearRect(-70,-70,150,150);
    loading.update();
}
animate();