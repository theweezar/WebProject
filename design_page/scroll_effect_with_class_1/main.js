class ScrollEffect{
  constructor(attr = {parentNodeID:"",transition:1},components = []) {
    this.parent = document.getElementById(attr.parentNodeID);
    this.transition = attr.transition;
    this.components = components;
    this.scroll = true;
    this.current = 0;
  }
  createPage(id = 0){
    return `<div style="width:100%; height:100%;" class="page" id="page-${id}"> ${this.components[id]} </div>`;
  }
  render = () => {
    for(var i = 0; i < this.components.length; i++){
      this.parent.innerHTML += this.createPage(i);
    }
    window.addEventListener("mousewheel",(e) => {
      
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