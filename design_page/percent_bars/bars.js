let bars = [
  {id:"b1",width:"75%"},
  {id:"b2",width:"50%"}
];

function Load_1(){
  bars.forEach(element => {
    document.getElementById(element.id).setAttribute("style","transition: 1.5s; width: "+element.width+";");
  });
}

function Load_2(p=0){
  if (p != bars.length){
    setTimeout(function(){
      document.getElementById(bars[p].id).setAttribute("style","transition: 1.5s; width: "+bars[p].width+";");
      p += 1;
      Load_2(p);
    },250)
  }
}
// Load_1();
Load_2(0);