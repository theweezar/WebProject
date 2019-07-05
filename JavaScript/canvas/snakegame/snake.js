// Thiết lập bảng canvas
let canvas = document.querySelector("canvas"),h,w,k=0,score_box = document.getElementById("score"),
    replay_box = document.getElementById("replay");
let c = canvas.getContext("2d"), box=20, snake, food, len=3, movekey = 39, over,score=0, img = new Image(box,box);
let img_apple = new Image();
img_apple.src = "apple.png";
canvas.height = 540;
canvas.width = 800;
console.log(canvas.width);console.log(canvas.height);

img.src = "dot.png";

function Distance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

let realheight = canvas.height/box, // = 30 
    realwidth = canvas.width/box; // = 60
    // vì mỗi lần cái đầu di chuyển nó di chuyển tới {box} bước đi nên để như thường thì nó đi ra khỏi màn hình
// Object tọa độ - có thể lấy cái này gắn cho mọi thứ :)
function COORD(x,y){
    this.x = x;//Math.floor(Math.random()*realwidth);
    this.y = y;//Math.floor(Math.random()*realheight);
}
/**
 * Ý tưởng, sẽ có duy nhất 1 đối tượng là cái đầu để điều khiển
 * Trong đối tượng đầu sẽ có list tail lúc khởi tạo sẽ chứa chính object cái đầu đó.
 * Khi ăn food lần đầu tiên thì Snake.tail sẽ push 1 new tọa độ bằng chính tọa độ của thằng phần tử cuối của Snake.tail
 * Khi di chuyển, sẽ xét từ đít lên tới đầu, i.COORD = (i - 1).COORD. Tọa độ dưới sẽ bằng tọa độ thằng ở trên nó
 */
function Snake(){
    this.x = Math.floor(Math.random()*realwidth);
    this.y = Math.floor(Math.random()*realheight);
    this.tail = [this]; // Class này là object của cái đầu con rắn, nên phải có thằng this mới có thể so sánh những cái đuôi
    this.dx = 1; // tương đương với nút rẽ right
    this.dy = 0;

    this.run = function(){
        this.HitTheWall(false);
        this.Eatfood();
        this.HitTheTail(true);
        for(i=this.tail.length-1;i>0;i--){ // xét từ đít trước, giống như thuật toán xóa xog rồi đẩy phần tử lên
            this.tail[i].x = this.tail[i-1].x;
            this.tail[i].y = this.tail[i-1].y;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        // this.drawGrid();
        this.drawSnake();
        this.drawFood();
    }
    this.HitTheWall = function(bool){
        if (bool) {
            if (this.x >= realwidth || this.x < 0 || this.y >= realheight || this.y < 0) this.Endgame();
        }
        else{
            if (this.x >= realwidth) this.x = 0 ;
            if (this.x < 0) this.x = realwidth;
            if (this.y >= realheight) this.y = 0;
            if (this.y < 0) this.y = realheight;
        }
    }
    this.drawSnake = function(){
        c.beginPath();
        c.fillStyle = "chartreuse";
        c.fillRect(this.x*box,this.y*box,box,box);
        for(i=this.tail.length-1;i>0;i--){
            c.fillRect(this.tail[i].x*box,this.tail[i].y*box,box,box);    
        }
        c.closePath();
    }
    this.drawFood = function(){
        c.beginPath();
        // c.fillStyle = "yellow";
        c.drawImage(img_apple,food.x*box,food.y*box,box,box);
        c.closePath();
    }
    this.drawGrid = function(){
        c.beginPath();
        c.strokeStyle = "rgba(169, 169, 169, 0.3)";
        for(i=1;i<realwidth;i++){
            c.moveTo(i*box,0);
            c.lineTo(i*box,canvas.height);
            c.stroke();
        }
        for(i=1;i<realheight;i++){
            c.moveTo(0,i*box);
            c.lineTo(canvas.width,i*box);
            c.stroke();
        }
        c.closePath();
    }
    this.Eatfood = function(){
        if (Distance(this.x,this.y,food.x,food.y)==0){
            food = new COORD(Math.floor(Math.random()*realwidth),Math.floor(Math.random()*realheight));
            this.tail.push(new COORD(this.tail[this.tail.length-1].x,this.tail[this.tail.length-1].y));
            score++;
        }
    }
    this.HitTheTail = function(bool){
        if (bool){
            for(i=2;i<this.tail.length;i++){
                if (Distance(this.x,this.y,this.tail[i].x,this.tail[i].y)==0){
                    this.Endgame();
                }
            }
        }
    }
    this.Endgame = function(){
        clearInterval(game);
        replay_box.classList.add("show");
    }
    
}

function init(){
    snake = new Snake();
    food = new COORD(Math.floor(Math.random()*realwidth),Math.floor(Math.random()*realheight));
}

function play(){
    // requestAnimationFrame(play);
    c.clearRect(0,0,canvas.width,canvas.height);
    snake.run(); 
    score_box.innerText = score;
}

window.addEventListener("keydown",function(e){
    switch (e.keyCode) {
        case 37: // left
            if (movekey!=39){
                snake.dx=-1;snake.dy=0;
                movekey = e.keyCode;
            }
            break;
        case 38: // Up
            if (movekey!=40){
                snake.dx=0;snake.dy=-1;
                movekey=e.keyCode;
            }
            break;
        case 39: // Right
            if (movekey!=37){
                snake.dx=1;snake.dy=0;
                movekey = e.keyCode;
            }
            break;
        case 40: // Down
            if (movekey!=38){
                snake.dx=-0;snake.dy=1; 
                movekey=e.keyCode;
            }
            break;
        default:
            break;
    }
})
init();
let game = setInterval(play,100); // nếu mà thua thì sẽ clearInterval của biến handler game