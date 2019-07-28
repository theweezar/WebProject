class Skill{
  constructor(parentNodeID="",items = [{name:"",percent:""}]) {
    this.parent = document.getElementById(parentNodeID);
    this.items = items;
  }
  element = () => {
    let div = "";
    this.items.forEach(item => {
      div+=`<div class="box">
              <div class="name">${item.name}</div>
                <div class="percent">
                  <div style="width:${item.percent}" class="pc-bar"></div>
                </div>
              </div>
            </div>`
    });
    return div;
  }
  render = () => {
    this.parent.innerHTML += this.element();
  }
}

window.onload = () => {
  let skill = new Skill("skill",[
    {name:"HTML5",percent:"70%"},
    {name:"CSS3",percent:"50%"},
    {name:"Javascript",percent:"60%"},
    {name:"Nodejs",percent:"30%"},
    {name:"Java",percent:"35%"},
    {name:"PHP",percent:"80%"}
  ]);
  skill.render();
}