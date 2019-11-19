const data = [
  {
    "tag":"greeting",
    "input":["hi","hello","hi there","hello there","what's up","hey"],
    "output":["hi","hello my friend","hello","hiiiiiiii","from the love of God, helly my fellow human"]
  }
];

let input = 'hi';

function process(){
  let reg = [];//new RegExp('hi','g');
  let words = [...input.split(/ /g)];
  words.forEach(word => {
    reg.push(new RegExp(word,'g'));
  })
  console.log(reg);
  data.forEach(section => {
    
  });
}

process();