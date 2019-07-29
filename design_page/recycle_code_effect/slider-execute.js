function Components(){
  let comp = [];
  let colors = ["red","yellow","green","aqua","black","blue"];
  colors.forEach(color => {
    comp.push(`<div style="width:100%;height:100%;background:${color}"></div>`);
  });
  return comp;
}

const slider = new Slider({
  parentNodeID:"slider-show",
  nextBtnID:"btn-next",
  previousBtnID:"btn-previous",
  distance:2,
  transition:1
},Components());

slider.render();