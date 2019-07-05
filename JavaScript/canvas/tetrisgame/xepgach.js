const cv = document.querySelector("canvas");
const c = cv.getContext("2d");

cv.width = 400;
cv.height = 600;
const box = 20, start=8; 
realw = cv.width/box;  // 20
realh = cv.height/box; // 30

function Create_Board(w,h){
    var matrix = [],tmp;
    for(i=0;i<h;i++){  
        tmp = new Array(w);
        for(j=0;j<w;j++){
            tmp[j]=0;
        }
        matrix.push(tmp);
    }
    return matrix;
}

function DrawMatrix(){
    c.beginPath();
    for(r=0;r<matrix.length;r++){
        for(i=0;i<matrix[r].length;i++){
            c.rect(i*box,r*box,box,box);
        }
        c.stroke();
    }
    c.closePath();
}
const b = [
    [0,1,0],
    [1,1,1],
    [0,0,0]
]; 
function COORD(x,y){
    this.x = x;
    this.y = y;
}
function App(){
    this.b=b;
    this.y=0;
    this.min_x=undefined;
    this.max_x=undefined;
    this.play = function(){
        this.draw_block();
    }
    this.find_max_min_x = function(){
        var lst_x=[];
        for(r=0;r<this.b.length;r++){
            for(v=0;v<this.b[r].length;v++){
                if(this.b[r][v]!=0){
                    lst_x.push(start+v);
                }
            }
        }
        this.min_x = Math.min(...lst_x);
        this.max_x = Math.max(...lst_x);
    }
    this.draw_block = function(){
        c.beginPath();
        for(r=0;r<this.b.length;r++){
            for(v=0;v<this.b[r].length;v++){
                if(this.b[r][v]!=0){
                    c.rect((this.min_x+v-1)*box,(this.y+r)*box,box,box);
                }
            }
            c.stroke();
        }
        c.fillRect(9*box,0,box,box);
        c.closePath();
    }
    this.move_left = function(m){
        console.log(this.min_x);
        if (this.min_x!=0){
            this.min_x += m;
            this.max_x += m;
        }
        console.log(this.min_x);
    }
}


let app = new App(),
    matrix = Create_Board(realw,realh);
app.find_max_min_x();

document.addEventListener("keydown",function(e){
    switch (e.keyCode) {
        case 37:
            app.move_left(-1);
            break;
        case 39:
            
            break;
        default:
            break;
    }
})

function play(){
    c.clearRect(0,0,cv.width,cv.height);
    app.play();
}

let game = setInterval(play,150);