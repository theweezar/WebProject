/*function coord(x,y){
    this.x = x;
    this.y = y;
}
function Food(){
    this.x = Math.floor(Math.random()*600+box);
    this.y = Math.floor(Math.random()*500+box);
}
function Snake(){
    this.body =[];
    this.head = 1;
}

function SnakeHead(x,y,box){
    this.x = x;
    this.y = y;
    this.box = box;
    this.speed = 5;
    this.len = [this];
    this.food = new Food();
    this.oldmovekey;

    this.update = function(key){
        for(i=this.len.length-1;i>0;i--){
            this.len[i].x = this.len[i-1].x;
            this.len[i].y = this.len[i-1].y;
        }
        this.draw_Snake_and_Food();
        switch (key) {
            case 37: // left
                this.x -= this.speed;
                this.oldmovekey=key;
                break;
            case 38: // Up
                this.y -= this.speed;
                this.oldmovekey=key;
                break;
            case 39: // Right
                this.x += this.speed;
                this.oldmovekey=key;
                break;
            case 40: // Down
                this.y += this.speed;
                this.oldmovekey=key;
                break;
            default:
                movekey = this.oldmovekey;
                break;
        }
        
        this.HitTheWall(false);
        this.Eatfood();
    }
    this.HitTheWall = function(bool){
        if (!bool) {
            if (this.x > canvas.width) this.x = 0 ;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
    }
    this.Eatfood = function(){
        if (Distance(this.x,this.y,this.food.x,this.food.y) < this.box){
            this.food = new Food();
            for(i=0;i<5;i++){
                this.len.push(new SnakeHead(this.x,this.y,this.box));
            }
        }
    }

    this.draw_Snake_and_Food = function(){
        c.beginPath();
        c.fillStyle = "black";
        for(i=this.len.length-1;i>0;i--){
            c.fillRect(this.len[i].x,this.len[i].y,this.box,this.box);    
        }
        c.fillRect(this.x,this.y,this.box,this.box);
        c.fillStyle = "yellow";
        c.fillRect(this.food.x,this.food.y,this.box,this.box);
        c.closePath();
    }
}

function init(){
    snake = new SnakeHead(100,100,box);
}

function play(){
    requestAnimationFrame(play);
    c.clearRect(0,0,canvas.width,canvas.height);
    snake.update(movekey);
}

init();
play();*/