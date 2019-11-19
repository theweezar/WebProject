const data = [
  {
    "tag":"greeting",
    "input":["hi","hello","hi there","hello there","what's up","hey"],
    "output":["hi","hello my friend","hello","hiiiiiiii","from the love of God, helly my fellow human"]
  }
];

let input = 'hi there';

function process(){
  let Reg = [];//new RegExp('hi','g');
  let words = [...input.split(/ /g)];
  // tách chuỗi và đổi thành RegExp
  words.forEach(word => {
    Reg.push(new RegExp(word.toLocaleLowerCase(),'g'));
  })
  console.log(Reg);

  // Match với phần tử trong input của mỗi tag
  let pList = [];
  data.forEach(a => {
    let match = []; // tạo 1 mảng match tổng
    let match_len = a.input.length;
    let match_p = 0;
    Reg.forEach((reg,i) => {
      match.push([]); // cứ mỗi Regexp thì sẽ có thêm 1 mảng
      a.input.forEach(el => {
        if (el.match(reg) !== null){
          match[i].push(1);
        }
        else match[i].push(0);
      });
    });

    // Cộng tất cả giá trị của từng cột, nếu giá trị đó !== 0 thì match_p++
    
    for(let k = 0; k < match_len; k++){
      let tmp = 0;
      for(let j = 0; j < match.length; j++){
        tmp += match[j][k];
      }
      if (tmp !== 0) match_p++;
    }

    pList.push(match_p / match_len);
    console.log(match);
    console.log(`Percent: ${match_p}`);

  });

  console.log(`pList: ${pList}`);

  // Ta tìm phần tử lớn nhất trong pList rồi lấy vị trí đó
  let max = pList[0];
  let max_p = 0;

  for(let i = 0; i < pList.length; i++){
    for(let j = 0; j < pList.length; j++){
      if (pList[j] > pList[i]){
        max = pList[j];
        max_p = j;
      }
    }
  }
  console.log(max);
  console.log(max_p);

  let rand = Math.floor(Math.random()*(data[max_p].output.length-0)+0);

  console.log(rand);
}

// process();