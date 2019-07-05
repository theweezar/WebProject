let wallpp = ["p1","p2","p3","p4"];

function Load_Wallpaper(){
  var ctn = document.getElementById("container");
  for(var i=0;i<wallpp.length;i++){
    var tag = document.createElement("div"); // tạo 1 thẻ div mới
    tag.setAttribute("id",wallpp[i]); // cho thẻ div (tag) 1 cái id
    tag.style.background = "url('"+wallpp[i]+".jpg')"; // gắn hình nên nhỏ vào thẻ div(tag)
    tag.style.backgroundSize = "cover";
    tag.style.backgroundRepeat = "no-repeat";
    // cách khác để add background - dòng dưới
    // tag.setAttribute("style","background:url('"+wallpp[i]+".jpg') no-repeat; background-size:cover;");
    tag.classList.add("element"); // add class element bên css
    ctn.appendChild(tag); // thêm thằng con là div(tag) vào bên trong thẻ ctn
  }
}

function HoverBackground(){
  // đây là cách dùng foreach, dòng này nghĩa là với mọi phần tử wall trong list wallpp, ta làm .....
  wallpp.forEach(wall => {
    document.getElementById(wall).addEventListener("mouseover",function(){
      document.getElementById("bg").setAttribute("style",
      "background:url('"+wall+".jpg') no-repeat; background-size:cover;");
      // nếu trỏ chuột vào thì sẽ thêm mấy cái thành phần wallpaper vào style của thẻ có id = bg
    })
    document.getElementById(wall).addEventListener("mouseout",()=>{
      document.getElementById("bg").removeAttribute("style");
      // nếu bỏ chuột ra thì xóa cái style trong thẻ đó
    })
  });
}


Load_Wallpaper();
HoverBackground();