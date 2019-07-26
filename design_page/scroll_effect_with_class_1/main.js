class ScrollEffect{
  /**
   *  
   * @param {*} components.reverse là vì thẻ page có position absolute nên phần tử cuối cùng sẽ xuất hiện 
   * ở đầu tiên
   */
  constructor(attr = {parentNodeID:"",transition:1},components = []) {
    this.parent = document.getElementById(attr.parentNodeID);
    this.transition = attr.transition;
    this.components = components.reverse(); // reverse là vì thẻ page sẽ có pos abs nên thằng cuối cùng sẽ
    this.scroll = true;
    this.current = this.components.length - 1;
  }
  createPage(id = 0){
    return `<div class="page" id="page-${id}"> ${this.components[id]} </div>`;
  }
  render = () => {
    this.parent.style.setProperty("--input_transition",`${this.transition}s`); // fix transition in css
    for(var i = 0; i < this.components.length; i++){
      this.parent.innerHTML += this.createPage(i);
    }
    // trigger and effects here
    window.addEventListener("mousewheel",(e) => {
      if (e.wheelDelta > 0 && this.scroll){ // Go up
        this.scroll = false;
        if (this.current < this.components.length - 1){
          document.getElementById(`page-${++this.current}`).setAttribute("style",`top:0;`);
        }
        setTimeout(() => {this.scroll = true},this.transition*1000 + 1000);
      }
      if (e.wheelDelta < 0 && this.scroll){ // Go down 
        this.scroll = false;
        if (this.current >= 1){
          document.getElementById(`page-${this.current--}`).setAttribute("style",`top:-100%;`);
        }
        setTimeout(() => {this.scroll = true},this.transition*1000 + 1000);
      }
    });
  }
}
function Components(){
  let cpn = [];
  let colors = ["#5680E9","#84CEEB","#5AB9EA","#C1C8E4","#8860D0"];
  for(var i = 0; i < colors.length; i++){
    cpn.push(`<div class="content" style="background:${colors[i]};">
                <h1>This is page ${i+1}</h1>
              </div>`);
  }
  return cpn;
}
window.onload = () => {
  const scroll = new ScrollEffect({
    parentNodeID:"container",
    transition:1
  },Components());
  scroll.render();
}