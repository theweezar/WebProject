let w = document.getElementById("wall"),
    wlist = ["lake1","lake2","mountain1","snow1","snow2","way1"], pos = 0, pre = 0, first = true;

let BgTag_1 = (bg_name,pos) => {
    var tag = document.createElement("div");
    tag.style.background = "url('" + bg_name + ".jpg')";
    tag.style.backgroundSize = "cover";
    tag.style.backgroundRepeat = "no-repeat";
    tag.setAttribute("id","wall"+pos);
    tag.setAttribute("class","abs bg mfrtl");
    return tag;
}

let Change_1 = () => {
    pos = pos == wlist.length-1 ? 0:++pos; // tính vị trí
    w.appendChild(BgTag_1(wlist[pos],pos));
    setTimeout(() => {
        w.removeChild(document.getElementById("wall"+pre));
        pre = pos;
    }, 2000);
}

let BgTag_2 = (bg_name,pos) => {
    var tag = document.createElement("div");
    tag.style.background = "url('" + bg_name + ".jpg')";
    tag.style.backgroundSize = "cover";
    tag.style.backgroundRepeat = "no-repeat";
    tag.setAttribute("id","wall"+pos);
    tag.setAttribute("class","abs bg sink");
    return tag;
}

let Change_2 = () => {
    pos = pos == wlist.length-1 ? 0:++pos;
    w.appendChild(BgTag_2(wlist[pos],pos));
    document.getElementById("wall"+pre).classList.add("fade-out");
    setTimeout(() => {
        document.getElementById("wall"+pos).classList.remove("sink");
        w.removeChild(document.getElementById("wall"+pre));
        pre = pos;
    }, 3000); // sleep sau 3s rồi mới thực hiện các dòng lệnh trong đây
}
// setInterval(Change,5000);
setInterval(Change_2,5000);