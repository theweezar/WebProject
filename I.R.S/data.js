const data = [
  {
    "tag":"greeting",
    "input":["hi","hello","hi there","hello there","what's up","hey"],
    "output":["hi","hello my friend","hello","hiiiiiiii","from the love of God, helly my fellow human"]
  },
  // {
  //   "tag":"",
  //   "input":[],
  //   "output":[]
  // },
  // {
  //   "tag":"",
  //   "input":[],
  //   "output":[]
  // },
  // {
  //   "tag":"",
  //   "input":[],
  //   "output":[]
  // },
  // {
  //   "tag":"",
  //   "input":[],
  //   "output":[]
  // },
  // {
  //   "tag":"",
  //   "input":[],
  //   "output":[]
  // }
];

const canUnderstandOutput = [
  "Sorry, I don't understand what you are trying to say",
  "WTF dude ??",
  "...",
  "Can't understand"
];

let input = 'h';

function process(){
  let Reg = [];//new RegExp('hi','g');
  let words = [...input.split(/ /g)];
  // tách chuỗi và đổi thành RegExp
  words.forEach(word => {
    Reg.push(new RegExp(`(${word.toLocaleLowerCase()})\\w+`,'g'));
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
        // Đầu tiên ta sẽ dùng Regexp => /(input.split(' ' ))\w+/g
        // nghĩa là input = 'h' thì Regexp = /(h)\w+/g và nó sẽ match ra những string 
        // như hi, hello, here, ....
        // nhưng nếu như input = 'hi' thì nó sẽ ko match ra dc vì sau hi trong data.input ko 
        // chữ kí tự mà chỉ có khoảng trắng, nên nó sẽ return null
        let mList = el.match(reg);
        console.log(mList);
        if (mList !== null){
          let canFind = true;
          for(let k = 0; k < mList.length; k++){
            if (mList[k] === words[i]){
              match[i].push(1);
              canFind = false;
              break;
            }
          }
          if (canFind) match[i].push(0);
        }
        // Nếu null thì sẽ dùng Regexp => /(input.split(' ' ))/g
        // nghĩa là input = 'h' thì Regexp = /h/g và nó sẽ match ra những string có chữ h trong đó
        else{
          mList = el.match(new RegExp(words[i].toLocaleLowerCase(),'g'));
          if (mList !== null){
            let canFind = true;
            for(let k = 0; k < mList.length; k++){
              if (mList[k] === words[i]){
                match[i].push(1);
                canFind = false;
                break;
              }
            }
            if (canFind) match[i].push(0);
          }
          else match[i].push(0);
        }
        // sau khi match Regexp xong ta bắt đầu so sánh những giá trị của những List regexp đó
        // xem có giống như input ko
      });
    });

    console.log(`Match[0-1]: ${match}`);
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
  console.log(`The highest percent in pList : ${max}`);
  console.log(`The highest position in pList: ${max_p}`);
  let rand;
  if (max !== 0){
    rand = Math.floor(Math.random()*(data[max_p].output.length-0)+0);
  }
  else rand = Math.floor(Math.random()*(canUnderstandOutput.length-0)+0);
  

  console.log(`Output random: ${rand}`);
}

// process();