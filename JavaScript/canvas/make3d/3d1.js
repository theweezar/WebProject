let cv = document.querySelector("canvas");
let c = cv.getContext("2d");

cv.height = innerHeight - 5;
cv.width = innerWidth;

// c.rotate(0.1);
c.transform(1, .2, .8, 1, 0, 0);
function DrawBoard(){
    c.beginPath();
    c.fillStyle = "black";
    c.fillRect(0,0,100,100);
    c.closePath();
}

DrawBoard();