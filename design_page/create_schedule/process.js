window.onload = () => {
  document.querySelectorAll("td#free").forEach(item => {
    item.innerHTML = "Rãnh";
    item.addEventListener("click",() => {
      if (item.id === "free"){
        item.setAttribute("id","busy");
        item.innerHTML = "Đi học";
      }
      else{
        item.setAttribute("id","free");
        item.innerHTML = "Rãnh";
      }
    });
  });
  document.getElementById("capture").addEventListener("click",function(){
    let link = this;
    html2canvas(document.querySelector("table")).then(canvas => {
      // Capture
      document.body.appendChild(canvas)
      let image = canvas.toDataURL("image/png");
      console.log(image);
      
      // link.setAttribute("href",`${image}`);
    });
  });
};