let cv = document.querySelector("canvas");
let c= cv.getContext("2d");
cv.height = innerHeight-10;
cv.width = innerWidth;

c.translate(cv.width/2,cv.height/2); // giống như trong css

function Line(x_start, scl){ 
    this.x = x_start; // x đầu
    this.y = -Math.pow(this.x,2)/16 + 5; // y đầu
    this.scl = scl; // scale - giống Zoom in
    this.end = this.y; // ngang với y đầu thì dừng
    this.step = Math.abs(x_start / 100); // nó phải dương - abs : absolute - giá trị tuyệt đối

    this.update = function(){
        this.draw();
        this.process();
    }

    this.process = function(){
        if (this.y < this.end) cancelAnimationFrame(start);
        this.x += this.step;
        this.y = -Math.pow(this.x,2)/16 + 5;
        console.log(this.x);
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x*this.scl,this.y*this.scl,8,0,Math.PI*2,false);
        c.fillStyle = "slateblue";
        c.strokeStyle = "slateblue";
        c.stroke();
        c.fill();
        c.closePath();
    }
}

let start, equal = new Line(-15,20);

function animate(){
    start = requestAnimationFrame(animate);
    equal.update();
}
animate();