const allcanvas = document.querySelectorAll("canvas");
const ctx1 = allcanvas[0].getContext("2d");
const ctx2 = allcanvas[1].getContext("2d");

allcanvas[0].width = allcanvas[1].width = 1000;
allcanvas[0].height = allcanvas[1].height = 500;

const g = 9.8;

class Pendulum{
  constructor() {
    this.coord_0 = {x:allcanvas[0].width / 2, y:250}; // điểm cố dịnh
    this.coord_1 = {x:undefined,y:undefined};
    this.coord_2 = {x:undefined,y:undefined};
    this.m1 = 10;
    this.m2 = 10;
    this.l1 = 100;
    this.l2 = 100;
    this.angle1 = -Math.PI/3;
    this.angle2 = Math.PI/6;
    this.z1 = 0.01;
    this.z2 = -0.001;
  }
  calc_z(){
    
  }
  calcCoordXY1(){
    let dx = this.l1 * Math.sin(this.angle1);
    let dy = this.l1 * Math.cos(this.angle1);
    this.coord_1.x = this.coord_0.x + dx;
    this.coord_1.y = this.coord_0.y + dy;
  }
  calcCoordXY2(){
    let dx = this.l2 * Math.sin(this.angle2);
    let dy = this.l2 * Math.cos(this.angle2);
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
    ctx2.beginPath();
    ctx2.arc(this.coord_2.x,this.coord_2.y,1,0,Math.PI*2,false);
    ctx2.stroke();
    ctx2.closePath();
  }
  update(){
    this.angle1 += 0.1;
    this.angle2 += -0.1;
    this.calc_z();
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
  // let start = requestAnimationFrame(animate);
  ctx1.clearRect(0,0,allcanvas[0].width,allcanvas[0].height);
  pendulum.render();
  if (Math.abs(pendulum.v1) === Infinity && Math.abs(pendulum.v2) === Infinity) cancelAnimationFrame(start);
}
animate();