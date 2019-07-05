var canvas = document.querySelector("canvas"); 

canvas.width = window.innerWidth ;  // Set width & height cho khối canvas
canvas.height = window.innerHeight -4; // Set đại cho nó đẹp

var c = canvas.getContext('2d');

// Khối
// c.fillStyle = "lightgreen"; // set color cho khối. set color phải dc làm đầu tiên trước khi draw
// c.fillRect(100,100,50,50);
// // c.fillRect(x,y,width,height) : Set 1 khối vuông ở vị trí (x,y) = (100,100) có w,h = 100
// c.fillStyle = "lightblue"; // tô màu cho từng khối
// c.fillRect(200,100,50,50); // Set bao nhiêu thì tùy


// Đường thẳng
// c.beginPath();
// c.moveTo(50,200); // Set điểm đầu tiên ở (50,200);
// c.lineTo(100,170); // điểm tiếp theo thứ 1 (100,170);s
// c.lineTo(120,250); // điểm tiếp theo thứ 2 (120,250), có thể set tới n điểm
// c.strokeStyle = "red"; // set color cho đường viền border
// c.stroke();     // gọi method stroke để vẽ, nếu thiếu sẽ ko thấy dc
// c.closePath();

// // Hình tròn
// c.beginPath();
// c.arc(300,200,50,0,Math.PI*2,false);
// c.strokeStyle = "lightcoral"; // Set color cho border
// c.stroke();

// for (var i=0;i<1000;i++){
//     var x = Math.floor(Math.random()*innerWidth);
//     var y = Math.floor(Math.random()*innerHeight);
//     var lstcolor =["red","chartreuse","blueviolet","lightgreen","lightblue","black","yellow"];
//     c.beginPath();
//     c.arc(x,y,2,0,Math.PI*2,false);
//     c.strokeStyle = lstcolor[Math.floor(Math.random()*lstcolor.length)];
//     c.stroke();
//     c.closePath();
// }
var mouse = {
    "x":undefined,
    "y":undefined
};
window.addEventListener("mousemove",function(event){ 
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})

var max_r = 40;
function Circle(x,y,r,dx,dy,color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.old_r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.update = function(){
        if (this.x+this.r>canvas.width || this.x-this.r<0){
            this.dx=-this.dx;
        }
        if (this.y+this.r>canvas.height || this.y-this.r<0){
            this.dy=-this.dy;
        } 
        if (mouse.x - this.x < 100 && mouse.x -this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100){
            if (this.r < max_r) this.r += 1;
        }
        else if (this.r > this.old_r) this.r -= 1;
        // if (mouse.y - this.y < 20 && mouse.y - this.y > -20){
        //     this.dy=-this.dy;
        //     this.color = "brown";
        // }
        // else this.color = this.oldcolor;
        this.x+=this.dx; this.y+=this.dy;
        this.draw();
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
        c.closePath();
    }
}

// var x = Math.floor(Math.random()*innerWidth);
// var y = Math.floor(Math.random()*innerHeight);
// var r = 20; // Bán kính
// var speed = 3; // Khoảng cách thằng x sẽ di chuyển trong 1 vòng lặp - giống speed
// var dx = speed; 
// var dy = speed;

var ListBall = [],
    amount = 300,
    Color = ["red","chartreuse","blueviolet","lightgreen","lightblue","black","yellow"];

for (var i=0;i<amount;i++){
    var x = Math.floor(Math.random()*innerWidth);
    var y = Math.floor(Math.random()*innerHeight);
    var r = Math.floor(Math.random()*7+2); // Bán kính
    var color = Color[Math.floor(Math.random()*Color.length)];
    var dx = Math.random()-0.5; // dx là direction của x
    var dy = Math.random()-0.5;
    var Ball = new Circle(x,y,r,dx,dy,color); // Khởi tạo
    ListBall.push(Ball);    // giống push_back trong c++
}

function animate(){   
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<ListBall.length;i++){
        ListBall[i].update();
    }
}

animate();
