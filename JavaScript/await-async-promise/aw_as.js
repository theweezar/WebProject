function getA(){
  return 2;
}

function getB(){
  return 4;
}

function getC(){
  return 6;
}


async function TongABC(){
  let a = await getA();
  let b = await getB();
  let c = await getC();

  return a*b*c; // kq = 2 * 4 * 6 = 48
}

TongABC().then(rs => {console.log(rs);});