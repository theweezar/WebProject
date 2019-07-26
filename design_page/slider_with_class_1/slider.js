class Slider{
  /**
   *
   * @param {*Must have style position relative} parentNodeID This will contain all element of components array
   * @param {*Must have style position absolute} components
   * @param {*distance can't not bigger than components.length}
   * This animation can't work without this 2 things
   * ClassName's group will be "group" and id will be "components.length / distance"
   */
  constructor(parentNodeID = "",components=[],distance = 0,nextBtnID = "",previousBtnID = "",transition = 1){
    this.parentNode = document.getElementById(`${parentNodeID}`);
    this.components = components;
    this.distance = distance < components.length ? distance : components.length;
    this.nextBtn = document.getElementById(`${nextBtnID}`);
    this.previousBtn = document.getElementById(`${previousBtnID}`);
    this.transition = transition;
    this.click = true;
    this.current = 0;
  }
  splitGroup(from){
    let to = from + this.distance < this.components.length ? from + this.distance : this.components.length;
    let members = "";
    for(var i = from; i < to; i++){
      members += this.components[i];
    }
    let group=`<div class="group" id="g${from / this.distance}" style="left:${from !== 0 ? "100%":"0"}">
                ${members}
              </div>`;
    return group;
  }
  render(){
    for(var i = 0; i < this.components.length ; i += this.distance){ // append 1 lần hết tất cả phần tử ra ngoài luôn
      this.parentNode.innerHTML += this.splitGroup(i);
    }
    this.nextBtn.addEventListener("click",() => {
      console.log(`click and ${this.click}`);
      if(this.current + 1 < this.components.length / this.distance && this.click){
        document.querySelector(`#${this.parentNode.id} #g${this.current}`).setAttribute("style",`left:-100%; transition:${this.transition}s;`);
        document.querySelector(`#${this.parentNode.id} #g${++this.current}`).setAttribute("style",`left:0%; transition:${this.transition}s;`);
        this.click = false;
        setTimeout(() => {this.click = true;},this.transition*1000 - 200);
      }
    });
    this.previousBtn.addEventListener("click",() => {
      if (this.current - 1 >= 0 && this.click){
        document.querySelector(`#${this.parentNode.id} #g${this.current}`).setAttribute("style",`left:100%; transition:${this.transition}s;`);
        document.querySelector(`#${this.parentNode.id} #g${--this.current}`).setAttribute("style",`left:0%; transition:${this.transition}s;`);
        this.click = false;
        setTimeout(() => {this.click = true;},this.transition*1000 - 200);
      }
    });
  }
}

