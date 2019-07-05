let cv = document.querySelector("canvas");
let c = cv.getContext("2d"), box = 50, img_miner = new Image();

cv.width = innerWidth;
cv.height = innerHeight - 5;

img_miner.src = "miner.png";
let mouse = {x:undefined,y:undefined};
function Distance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

function Platform(){
    this.x = cv.width;
    this.y = 550;

    this.update = function(){
        this.draw_platform();
    }

    this.draw_platform = function(){
        c.beginPath();
        c.moveTo(0,this.y);
        c.lineTo(this.x,this.y);
        c.lineWidth = 5;
        c.strokeStyle = "blue";
        c.stroke();
        c.closePath();
    }
}

function Target(){
    this.x = Math.floor(Math.random()*(1100-50)+50);
    this.y = 0;
    this.box = Math.floor(Math.random()*(50-20)+20);
    this.speed = Math.floor(Math.random()*(5-2)+2);
    this.draw_target = function(){
        c.beginPath();
        c.fillStyle = "green";
        c.fillRect(this.x,this.y,this.box,this.box);
        c.closePath();
    }
}
function Miner(){
    this.platform = new Platform();
    this.x = 100;
    this.y = this.platform.y - box;
    this.step = 10;
    this.jumping = false; // Khi ở đất liền thì ko có "đang nhảy"
    this.jumpreach = 150;
    this.up=1;
    this.controller = {
        left:false,
        right:false,
        up:false
    }
    this.gravity = 0.5;
    this.bullet = { // điểm xuất phát của đạn nằm ngay chính giữa
        x:undefined,
        y:undefined
    };
    this.fire = false;
    this.target = new Target();
    this.point = 0;
    this.update = function(){
        this.platform.update();
        this.target.draw_target();
        this.draw_miner();
        this.draw_point();
        this.process();
        if (this.fire) this.draw_bullet();
        
    }

    this.process = function(){
        // Process Miner
        if(this.controller.left){
            this.x -= this.step;
        }
        if(this.controller.right){
            this.x +=this.step;
        }
        this.y += this.up;
        if (this.controller.up && !this.jumping){
            this.up = -20; // Khi ấn lên thì sẽ có "đang nhảy" và 20 bước
            this.jumping = true; 
        }
        else{
            if (this.y >= this.platform.y - box){
                this.jumping = false;
                this.up = 0;
                this.y = this.platform.y - box;
            }
            else{
                this.up += 1.5; // mỗi lần lặp lại thì bước nhảy càng bé lại cho đến khi nó lớn hơn 0 thì sẽ đi xuống
            }
        }
        if (this.x <= 0) this.x=0;
        if (this.x >= cv.width - box) this.x = cv.width - box;
        // Process Bullet
        if (this.fire){ // 50 là speed
            this.bullet.x += 50 * (mouse.x - this.x)/Distance(this.x,this.y,mouse.x,mouse.y); // cos | kề/ huyền
            this.bullet.y += 50 * (mouse.y - this.y)/Distance(this.x,this.y,mouse.x,mouse.y); // sin | đối/ huyền
            // Vẽ tam giac ra rồi tự xem tự cm
        }
        else{
            this.bullet.x = undefined;
            this.bullet.y = undefined;
        }
        if (this.bullet.x < 0 || this.bullet.y <0 || this.bullet.x > cv.width || this.bullet.y > this.platform.y) this.fire = false;
        // Process Target
        if (this.bullet.x - this.target.x > -10 && this.bullet.x - this.target.x < this.target.box*1.5 && this.bullet.y - this.target.y > -10 && this.bullet.y - this.target.y < this.target.box*1.5){
            this.target = new Target();
            this.point++;
        }
        if (this.target.y > this.platform.y - this.target.box) cancelAnimationFrame(start);
        this.target.y += this.target.speed;
    }

    this.draw_miner = function(){
        c.beginPath();
        c.fillStyle = "purple";
        c.strokeStyle = "black";
        c.rect(this.x,this.y,box,box);
        c.stroke();
        c.fill();
        c.closePath();
    }

    this.draw_bullet = function(){
        c.beginPath();
        c.fillStyle = "red";
        c.strokeStyle = "red";
        c.arc(this.bullet.x,this.bullet.y,2,0,Math.PI*2,false);
        c.stroke();
        c.fill();
        c.closePath();
    }
    
    this.draw_point = function(){
        c.beginPath();
        c.font='30px sans-serif';
        c.fillStyle = "black";
        c.fillText(this.point,20,50);
        c.stroke();
        c.closePath();
    }
}

let game = new Miner(), start;

window.addEventListener("keydown",function(e){
    switch (e.keyCode) {
        case 65: // left a
            game.controller.left = true;
            break;
        case 87: // up w
            game.controller.up = true;
            
            break;
        case 68: //right d
            game.controller.right = true;
            break;
        default:
            break;
    }
})

window.addEventListener("keyup",function(e){
    switch (e.keyCode) {
        case 65: // left a
            game.controller.left = false;
            break;
        case 87: // up w
            game.controller.up = false;
            break;
        case 68: //right d
            game.controller.right = false;
            break;
        default:
            break;
    }
})

window.addEventListener("click",function(e){
    game.fire = true;
    game.bullet.x = game.x + box/2;
    game.bullet.y = game.y + box/2;
    mouse.x = e.x;
    mouse.y = e.y;
})

function play(){
    start = requestAnimationFrame(play);
    c.clearRect(0,0,cv.width,cv.height);
    game.update();
}

play();