const Tong = (a,b) => {
  return a+b;
};

const Nhan = (a,b) => {
  return a*b;
};

// let c = Tong(4,Nhan(4,6)); // kq : 4 + 24 = 28

Promise.resolve(Nhan(4,6)).then(rs1 => Tong(4,rs1)).then(rs1 => console.log(rs1));
// 2 thằng rs1 sau mỗi then là 2 biến khác nhau hoàn toàn

// console.log(c);

function biggerThanSix(a){
  return new Promise((onSuccess,onErr) => { // có thể đổi tên của 2 thằng này, nhưng mặc định là trái là đúng, phải là sai
    if (a > 6) onSuccess(`So ${a} > 6`);
    else onErr(`So ${a} < 6`);
  });
}

console.log(biggerThanSix().then(rs => {console.log(rs);}));