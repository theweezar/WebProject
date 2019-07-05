let list = ["p1.jpg","p2.jpg","p3.jpg","p4.jpg","p5.jpg"];
let Pics = [];
let slider_1 = document.getElementById("slider-1");
let btn_next = document.getElementById("btn-next");
let btn_pre = document.getElementById("btn-pre");
let cur = 0; pre = -1;
list.forEach(pic => {
  var img = new Image();
  img.src = pic;
  Pics.push(img);
});

function ResizePic(pic = new Image()){
  var width = pic.width, height = pic.height, newsize = {pw:0,ph:0}, max_size;
  console.log("Before : " +width +"-"+height);
  // Thuật toán resize image 
  if (width > height) {
    max_size = innerWidth/2;
    if (width > max_size) {
        height *= max_size / width;
        width = max_size;
    }
  } 
  else {
    max_size = innerHeight/2;
    if (height > max_size) {
        width *= max_size / height;
        height = max_size;
    }
  }
  newsize.pw = (width / innerWidth) * 100;
  newsize.ph = (height / innerHeight) * 100;
  console.log("After : " +width +"-"+height);
  console.log(newsize);
  return newsize;
}

window.onload = () => {
  for(var i=0;i<Pics.length;i++){
    // tạo thẻ div chứa img
    var div = document.createElement("div");
    div.classList.add("item-frame");
    div.setAttribute("id","p"+i);
    if (i == cur) div.style.left = "0%";
    else div.style.left = "100%";
    // tạo thẻ img
    var size = ResizePic(Pics[i]);
    var p = document.createElement("img");
    p.src = Pics[i].src;
    p.setAttribute("width",size.pw+"%");
    p.setAttribute("height",size.ph+"%");
    // append ảnh vào thẻ div
    div.appendChild(p);
    // append thẻ div vào thẻ slider chính
    slider_1.appendChild(div);
  }
};

btn_next.addEventListener("click",() => {
  if (cur != Pics.length-1){
    document.getElementById("p"+cur).setAttribute("style","left: -100%; transition:0.5s;");
    document.getElementById("p"+(++cur)).setAttribute("style","left: 0%; transition:0.5s;");
  }
});

btn_pre.addEventListener("click",() => {
  if (cur != 0){
    document.getElementById("p"+cur).setAttribute("style","left: 100%; transition:0.5s;");
    document.getElementById("p"+(--cur)).setAttribute("style","left: 0%; transition:0.5s;");
  }
});