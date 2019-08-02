const allcanvas = document.querySelectorAll("canvas");
const ctx1 = allcanvas[0].getContext("2d");
const ctx2 = allcanvas[1].getContext("2d");

allcanvas[0].width = allcanvas[1].width = 1000;
allcanvas[0].height = allcanvas[1].height = 500;

const g = 0.98;

class Pendulum{
  constructor() {
    this.coord_0 = {x:allcanvas[0].width / 2, y:250}; // điểm cố dịnh
    this.coord_1 = {x:undefined,y:undefined};
    this.coord_2 = {x:undefined,y:undefined};
    this.m1 = 1;
    this.m2 = 1;
    this.l1 = 100;
    this.l2 = 100;
    this.a1 = Math.PI/2;
    this.a2 = 0;
    this.a1_v = 0;
    this.a2_v = 0;
    this.a1_a = 0;
    this.a2_a = 0;
    ctx2.moveTo(this.coord_2.x,this.coord_2.y);
    ctx2.strokeStyle = "gray";
    ctx2.lineWidth = 1;
  }
  calcA(){
    let n1 = -g * (2 * this.m1 + this.m2) * Math.sin(this.a1);
    let n2 = -this.m2 * g * Math.sin(this.a1 - 2*this.a2);
    let n3 = -2 * Math.sin(this.a1-this.a2) * this.m2;
    let n4 = Math.pow(this.a2_v,2) * this.l2 + Math.pow(this.a1_v,2) * this.l1 * Math.cos(this.a1-this.a2);
    let n5 = this.l1 * (2*this.m1+this.m2-this.m2*Math.cos(2*this.a1-2*this.a2));
    this.a1_a = (n1+n2+n3*n4)/n5;
    

    let p1 = 2*Math.sin(this.a1-this.a2);
    let p2 = Math.pow(this.a1_v,2)*this.l1*(this.m1+this.m2);
    let p3 = g*(this.m1+this.m2)*Math.cos(this.a1);
    let p4 = Math.pow(this.a2_v,2)*this.l2*this.m2*Math.cos(this.a1-this.a2);
    let p5 = this.l2*(2*this.m1+this.m2-this.m2*Math.cos(2*this.a1-2*this.a2));
    this.a2_a = (p1*(p2 + p3 + p4)) / p5;
  }
  calcCoordXY1(){
    let dx = this.l1 * Math.sin(this.a1);
    let dy = this.l1 * Math.cos(this.a1);
    this.coord_1.x = this.coord_0.x + dx;
    this.coord_1.y = this.coord_0.y + dy;
  }
  calcCoordXY2(){
    let dx = this.l2 * Math.sin(this.a2);
    let dy = this.l2 * Math.cos(this.a2);
    this.coord_2.x = this.coord_1.x + dx;
    this.coord_2.y = this.coord_1.y + dy;
  }
  draw_Point_0(){
    ctx1.beginPath();
    ctx1.lineWidth = 2;
    ctx1.arc(this.coord_0.x,this.coord_0.y,10,0,Math.PI*2,false);
    ctx1.stroke();
    ctx1.closePath();
  }
  draw_Line_Point_01(){
    ctx1.beginPath();
    ctx1.arc(this.coord_1.x,this.coord_1.y,10,0,Math.PI*2,false);
    ctx1.moveTo(this.coord_0.x,this.coord_0.y);
    ctx1.lineTo(this.coord_1.x,this.coord_1.y);
    ctx1.stroke();
    ctx1.closePath();
  }
  draw_Line_Point_12(){
    ctx1.beginPath();
    ctx1.arc(this.coord_2.x,this.coord_2.y,10,0,Math.PI*2,false);
    ctx1.moveTo(this.coord_1.x,this.coord_1.y);
    ctx1.lineTo(this.coord_2.x,this.coord_2.y);
    ctx1.stroke();
    ctx1.closePath();
  }
  draw_track(){
    ctx2.lineTo(this.coord_2.x,this.coord_2.y);
    ctx2.stroke();
  }
  update(){
    this.a1_v += this.a1_a;
    this.a2_v += this.a2_a;
    this.a1 += this.a1_v;
    this.a2 += this.a2_v;
    this.calcA();
    // this.a1_v *= 0.99;
    // this.a2_v *= 0.99;
    // console.log(this.a1_a);
  }
  render(){
    this.calcCoordXY1();
    this.calcCoordXY2();
    this.draw_Point_0();
    this.draw_Line_Point_01();
    this.draw_Line_Point_12();
    this.draw_track();
    this.update();
  }
}

const pendulum = new Pendulum();

function animate(){
  let start = requestAnimationFrame(animate);
  ctx1.clearRect(0,0,allcanvas[0].width,allcanvas[0].height);
  pendulum.render();
}
animate();