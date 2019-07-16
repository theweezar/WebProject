let cv = document.querySelector("canvas");
let c  = cv.getContext("2d");

cv.width = 600;
cv.height = 400;

let map = [], box = 20;
let w = cv.width / box;
let h = cv.height / box;
function InitMap(){
  for(var y = 0; y < h; y++){
    map[y] = [];
    map[y].length = w;
    map[y].fill(0);
  }
  console.log(map);
}

InitMap();