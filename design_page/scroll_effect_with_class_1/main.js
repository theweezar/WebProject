class ScrollEffect{
  constructor(attr = {parentNodeID:"",transition:1},components = []) {
    this.parent = document.getElementById(attr.parentNodeID);
    this.transition = attr.transition;
    this.components = components;
    this.scroll = true;
    this.current = 0;
  }
  createPage(id = 0){
    return `<div class="page" id="page-${id}"> ${this.components[id]} </div>`;
  }
  render = () => {
    for(var i = 0; i < this.components.length; i++){
      this.parent.innerHTML += this.createPage(i);
    }
    window.addEventListener("mousewheel",(e) => {
      console.log(e.wheelDelta);
      if (e.wheelDelta > 0 && this.scroll){ // Go up

      }
      if (e.wheelDelta < 0 && this.scroll){ // Go down 
        this.scroll = false;
        if (this.current < this.components.length - 1){
          document.getElementById(`page-${++this.current}`).setAttribute("style","height:0;transition:1s;");
        }
        // fix bug thẻ page-4 xuất hiện trên cùng trong html
      }
    });
  }
}


function Components(){
  let cpn = [];
  let colors = ["#5680E9","#84CEEB","#5AB9EA","#C1C8E4","#8860D0"];
  colors.forEach(color => {
    cpn.push(`<div style="width:100%; height:100%;background:${color};"></div>`);
  });
  return cpn;
}
window.onload = () => {
  const scroll = new ScrollEffect({
    parentNodeID:"container",
    transition:2
  },Components());
  scroll.render();
}