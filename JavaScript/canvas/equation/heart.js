let cv = document.querySelector("canvas");
let c= cv.getContext("2d");
cv.height = innerHeight-10;
cv.width = innerWidth;

c.translate(cv.width/2,cv.height/2); // giống như trong css

function Heart(){  // y++
    this.scl = 250;

    this.x = -1; // Chạy từ -1 vì điều kiện của phương trình
    this.ybody=-(Math.abs(this.x) - Math.sqrt(1-Math.pow(this.x,2)));   
    this.yhead=-(Math.abs(this.x) + Math.sqrt(1-Math.pow(this.x,2)));
    this.last_pos={x:this.x,ybody:this.ybody,yhead:this.yhead};
    
    this.update = function(){
        this.draw_body();
        this.draw_head();
        // this.draw();
        this.heart();
    }

    this.heart = function(){
        this.last_pos = {x:this.x,ybody:this.ybody,yhead:this.yhead};
        this.x +=0.01;
        if (this.x > 1) this.x=1; // Điều kiện vẽ điểm cuối cùng
        this.ybody = -(Math.abs(this.x) - Math.sqrt(1-Math.pow(this.x,2)));
        this.yhead = -(Math.abs(this.x) + Math.sqrt(1-Math.pow(this.x,2)));
        if (this.ybody==NaN && this.yhead==NaN) cancelAnimationFrame(start);
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x*this.scl,this.ybody*this.scl,7,0,Math.PI*2,false);
        c.arc(this.x*this.scl,this.yhead*this.scl,7,0,Math.PI*2,false);
        c.fillStyle = "red";
        c.strokeStyle = "red";
        c.stroke();
        c.fill();
        c.closePath();
    }

    this.draw_body = function(){
        c.beginPath();
        c.lineWidth = 3;
        c.strokeStyle = "red";
        c.moveTo(this.last_pos.x*this.scl,this.last_pos.ybody*this.scl/1.5);
        c.lineTo(this.x*this.scl,this.ybody*this.scl/1.5);
        c.stroke();
        c.closePath();
    }

    this.draw_head = function(){
        c.beginPath();
        c.lineWidth = 3;
        c.strokeStyle = "red";
        c.moveTo(this.last_pos.x*this.scl,this.last_pos.yhead*this.scl/1.5);
        c.lineTo(this.x*this.scl,this.yhead*this.scl/1.5);
        c.stroke();
        c.closePath();
    }

}

let start, heart = new Heart();

function animate(){
    start = requestAnimationFrame(animate);
    heart.update();
}
animate();