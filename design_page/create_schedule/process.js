window.onload = () => {
  document.querySelectorAll("td#free").forEach(item => {
    item.innerHTML = "Rãnh";
    item.addEventListener("click",() => {
      if (item.id === "free"){
        item.setAttribute("id","busy");
        item.innerHTML = "Bận";
      }
      else{
        item.setAttribute("id","free");
        item.innerHTML = "Rãnh";
      }
    });
  });
  document.getElementById("capture").addEventListener("click",function(){
    let link = document.createElement("a");
    html2canvas(document.querySelector("table")).then(canvas => {
      // Capture
      let image = canvas.toDataURL("image/jpg"); // convert canvas thành Data cho URL
      link.download = "mySchedule.jpg"; // Khi download nó sẽ auto để cái tên theo string này
      link.href = image; // dữ liệu để download 
      link.click(); // tự động ấn vào cái <a> đó, mặc dù mình ko add nó vào html
    });
  });
};