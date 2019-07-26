let colors = ["red","yellow","green","aqua","black","blue"];
function InitComponents(){
  let components = [];
  colors.forEach(color => {
    let bg = `<div style="background: ${color};" class="slide"></div>`;
    components.push(bg);
  });
  return components;
}
window.onload = () => {
  const slider = new Slider({
    parentNodeID:"slide-show",
    nextBtnID:"next",
    previousBtnID:"previous",
    distance:1,
    transition:0.5
  },InitComponents());
  slider.render();
}
