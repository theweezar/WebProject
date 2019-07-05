let target = document.getElementById("wall");
let list = ["pic1","pic2"];

function ScrollAnimate(){
    var position = target.getBoundingClientRect().top; 
    console.log(position);
    for(var i=0;i<list.length;i++){
        var pic = document.getElementById(list[i]);
        if (position < 300 - i*350 && position > 0 - i*1000){ // ở giữa
            // nếu con scroll trong khoảng này thì 2 bức ảnh sẽ hiện lên
            // nếu như đang ở trạng thái "mất" thì sẽ xóa class .mat và add class .hien
            if (pic.className == "mat") pic.classList.remove("mat");
            pic.classList.add("hien");
        }
        if (position < 0 - list.length*550 || position > 700){ // ở cuối cùng hoặc ở trên cùng
            // nếu con scroll trong khoảng này thì 2 bức ảnh sẽ mất đi
            // nếu như đang ở trạng thái "hiện" thì sẽ xóa class .hien và add class .mat
            if (pic.className == "hien") pic.classList.remove("hien");
            pic.classList.add("mat");
        }
    }
}

window.addEventListener("scroll",ScrollAnimate);

