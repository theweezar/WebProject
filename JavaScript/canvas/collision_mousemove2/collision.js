let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = innerWidth;
cv.height = innerHeight - 5;

function Distance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

function Circle(x,y,dx,dy,r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    
    this.update = Lst_Circle => {
        this.draw();
        for(i=0;i<Lst_Circle.length;i++){
            console.log(Lst_Circle.length);
            if (this === Lst_Circle[i]) continue;
            if (Distance(this.x,this.y,Lst_Circle[i].x,Lst_Circle[i].y) <= this.r*2){

                this.dx = -this.dx;
                this.dy = -this.dy;
                Lst_Circle[i].dx = -Lst_Circle[i].dx;
                Lst_Circle[i].dy = -Lst_Circle[i].dy;
                // console.log("Touch");
            }
        }
        if (this.x > cv.width-this.r || this.y > cv.height-this.r || this.x < this.r || this.y < this.r){
            this.dx=-this.dx;
            this.dy=-this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    this.draw = function(){
        c.beginPath();
        c.lineWidth=2;
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.stroke();
        c.closePath();
    }
}

let lst=[], amt=10, tmp=[], tmp_item={x:undefined,y:undefined,dx:undefined,dy:undefined},speed=2;
function Init(){
    var r=30;
    while (lst.length < amt){
        pass = true;
        omega = (Math.floor(Math.random()*(360-0)+0)*Math.PI)/180;
        tmp_item = {
            x: Math.floor(Math.random()*(1290-r)+r),
            y: Math.floor(Math.random()*(580-r)+r),
            dx: Math.cos(omega)*speed,
            dy: Math.sin(omega)*speed
        };
        for(i=0;i<tmp.length;i++){
            if (Distance(tmp_item.x,tmp_item.y,tmp[i].x,tmp[i].y) <= r*2){
                pass = false;
                break;
            }
        }
        if (pass){
            lst.push(new Circle(tmp_item.x,tmp_item.y,tmp_item.dx,tmp_item.dy,r));
            tmp.push(tmp_item);
        }
    }
    tmp.length=0;
}

let start;

function animate(){
    start = requestAnimationFrame(animate);
    c.clearRect(0,0,cv.width,cv.height);
    lst.forEach(each_circle => {
        each_circle.update(lst);
    })
}
Init();
animate();