class Slider{
  /**
   *
   * @param {*Must have style position relative} parentNodeID This will contain all element of components array
   * @param {*Must have style position absolute} components
   * @param {*distance can't not bigger than components.length}
   * This animation can't work without this 2 things
   * ClassName's group will be "group" and id will be "components.length / distance"
   */
  constructor(attr = {parentNodeID:"",nextBtnID:"",previousBtnID:"",distance:1,transition:1},components=[]){
    this.parentNode = document.getElementById(`${attr.parentNodeID}`);
    this.distance = Math.abs(attr.distance) < components.length ? Math.abs(attr.distance) : components.length;
    this.nextBtn = document.getElementById(`${attr.nextBtnID}`);
    this.previousBtn = document.getElementById(`${attr.previousBtnID}`);
    this.transition = attr.transition;
    this.components = components;
    this.click = true;
    this.current = 0;
    this.grid = this.calculateGrid();
    this.style = `position:absolute;display:grid;grid-template-columns:${this.grid};width:100%;height:100%;transition:${this.transition}s;`;
  }
  calculateGrid(){
    let grid = "";
    for(var i = 0; i < this.distance; i++){
      grid += `${100 / this.distance}% `;
    }
    return grid;
  }
  getGroup(from,offset=""){
    let to = from + this.distance < this.components.length ? from + this.distance : this.components.length;
    let members = "";
    for(var i = from; i < to; i++){
      members += this.components[i];
    }
    let group=`<div id="g${from / this.distance}" style="${this.style}left:${offset}">
                ${members}
              </div>`;
    return group;
  }
  next(){
    if (this.current + this.distance < this.components.length - 1){
      this.parentNode.innerHTML += this.getGroup(this.current + this.distance,"100%");
      setTimeout(() => {
        let curr = document.getElementById(`g${this.current / this.distance}`);
        let next = document.getElementById(`g${(this.current + this.distance) / this.distance}`);
        curr.setAttribute("style",`${curr.getAttribute("style").split("left")[0]};left:-100%`);
        next.setAttribute("style",`${next.getAttribute("style").split("left")[0]};left:0;`);
        this.current += this.distance;
      },10);
      
    }
  }
  previous(){

  }
  render(){
    // console.log(this.splitGroup(0));
    this.parentNode.setAttribute("style",`${this.parentNode.getAttribute("style") !== null ? this.parentNode.getAttribute("style")+";":""}position:relative;overflow:hidden`);
    this.parentNode.innerHTML = this.getGroup(this.current,"0");
    this.nextBtn.addEventListener("click",() => {this.next()});
  }
}
