let cv = document.querySelector("canvas");
let c = cv.getContext("2d"), img_bird = new Image(), pipe_up = new Image(), pipe_down = new Image();
img_bird.src = "bird.png";
pipe_up.src = "pipe_up.png";
pipe_down.src = "pipe_down.png";
console.log(pipe_up.width);
cv.height = window.innerHeight-5;
cv.width = window.innerWidth;

function draw_background(){
    c.beginPath();
    c.fillStyle="lightblue";
    c.fillRect(0,0,cv.width,cv.height);
    c.closePath();
}

let start;

function Bar(space_from_bar_to_bar){
    this.space_from_bar_to_bar = space_from_bar_to_bar;
    this.x_up = cv.width + Math.floor(Math.random()*(80-60)+60) + this.space_from_bar_to_bar;
    this.y_up = 0;
    this.h_up = Math.floor(Math.random()*(250-50)+50); // Chiều dài để vẽ
    
    this.space_jump_in = Math.floor(Math.random()*(280-220)+220);

    this.x_down = cv.width + Math.floor(Math.random()*(80-60)+60) + this.space_from_bar_to_bar;
    this.y_down = 0 + this.h_up + this.space_jump_in;
    this.h_down = cv.height - this.y_down; // Trong tập có vẽ để giải thích
    this.speed = 5;
    this.w = 150;

    this.process_bars = function(){
        this.x_up -= this.speed;
        this.x_down -= this.speed;
        if (this.x_up < -this.w && this.x_down < -this.w){
            this.x_up = cv.width + Math.floor(Math.random()*(80-60)+60); // ko + cái space kia vì khi khởi tạo mới
            this.y_up = 0;               // thì nó phải xuất hiện ở ngay đầu bên kia, chứ ko phải cách xa cả tất space đó
            this.h_up = Math.floor(Math.random()*(250-50)+50);
            
            this.space_jump_in = Math.floor(Math.random()*(280-220)+220);
        
            this.x_down = cv.width + Math.floor(Math.random()*(80-60)+60);
            this.y_down = 0 + this.h_up + this.space_jump_in;
            this.h_down = cv.height - this.y_down;
        }
        if (app.bird.x > this.x_up + this.w && app.bird.x > this.x_down + this.w && !app.point_track){
            app.point_track = true;
        } 
        // tính điểm
        
    }
    this.draw_bar = function(){
        c.beginPath();
        // c.fillStyle = "green";
        // c.fillRect(this.x_up,this.y_up,this.w,this.h_up);
        // c.fillRect(this.x_down,this.y_down,this.w,this.h_down);
        c.drawImage(pipe_up,this.x_up,this.y_up,this.w,this.h_up);
        c.drawImage(pipe_down,this.x_down,this.y_down,this.w,this.h_down);
        c.closePath();
    }
}
function App(){
    this.bird = {x:cv.width/6, y:cv.height/3, box:100};
    this.dy = 6;
    this.bars = [];
    this.point_track = false;
    this.point = 0;

    this.create_bars = function(){
        for(i=0;i<3;i++){
            this.bars.push(new Bar(i*500));
        }
    }

    this.update = function(){
        this.draw_bird();
        this.process_bird();
        for(i=0;i<this.bars.length;i++){
            this.bars[i].process_bars();
            this.bars[i].draw_bar();
        }
    }

    this.process_bird = function(){
        if (this.dy < 0){
            this.dy += 1.5;
        }
        else{
            this.dy = 6;
        }
        if (this.bird.y < 0) this.bird.y=0;
        if (this.bird.y > cv.height - this.bird.box/1.2) this.bird.y = cv.height - this.bird.box/1.2;
        if (this.point_track){
            this.point+=1; 
            this.point_track = false;
        }
        this.bird.y += this.dy;
    }

    this.draw_bird = function(){
        c.beginPath();
        c.drawImage(img_bird,this.bird.x,this.bird.y,this.bird.box,this.bird.box);
        // c.drawImage(img_bird,this.bird.x,this.bird.y);
        c.fillStyle = "black";
        c.font='30px sans-serif';
        c.fillText(this.point,cv.width/2,cv.height/2);
        c.closePath();
    }
}
let app = new App(); app.create_bars();
window.addEventListener("keydown",function(e){
    if (e.keyCode === 32){
        app.dy = -20;
    }
})
window.addEventListener("keyup",function(e){

})
function play(){
    start = requestAnimationFrame(play);
    c.clearRect(0,0,cv.width,cv.height);
    draw_background();
    app.update();
}

play();