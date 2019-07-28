document.getElementById("choose").style.setProperty("--offSetY","0%");
let previous = "0";
const pages=["home","about","skill","education","contact"];
document.querySelectorAll("[item-btn]").forEach(btn => {
  btn.addEventListener("click",() => {
    console.log(btn.id);
    if (btn.id !== previous){
      document.getElementById("choose").style.setProperty("--offSetY",`${0 + parseInt(btn.id)*100}%`);
      document.getElementById(pages[parseInt(btn.id)]).classList.remove("block");
      document.getElementById(pages[parseInt(btn.id)]).classList.add("show");
      document.getElementById(pages[parseInt(previous)]).classList.remove("show");
      document.getElementById(pages[parseInt(previous)]).classList.add("block");
      previous = btn.id;
    }
  });
});
