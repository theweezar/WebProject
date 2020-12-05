// kiểm tra ô vuông 3x3
function verifySquare(startFrom = 0, arr = []){
  const square = [];
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      square.push(arr[j + i * 9 + startFrom].innerText)
    }
  }
  // console.log(square);
  for(let i = 0; i < square.length; i++){
    if (square[i] != 0){
      for(let j = i + 1; j < square.length; j++){
        if (square[i] == square[j] && square[j] != 0) return false;
      }
    }
  }
  return true;
}

// kiểm tra đường thẳng
function verifyVertical(startFrom = 0, arr = []){
  const vertical = [];
  for(let i = 0; i < 9; i++){
    vertical.push(arr[i * 9 + startFrom].innerText);
  }
  // console.log(vertical);
  for(let i = 0; i < vertical.length; i++){
    if (vertical[i] != 0){
      for(let j = i + 1; j < vertical.length; j++){
        if (vertical[i] == vertical[j] && vertical[j] != 0) return false;
      }
    }
  }
  return true;
}

// kiểm tra đường ngang
function verifyHorizontal(startFrom = 0, arr = []){
  const horizontal = [];
  for(let i = 0; i < 9; i++){
    horizontal.push(arr[i + startFrom].innerText)
  }
  // console.log(horizontal);
  for(let i = 0; i < horizontal.length; i++){
    if (horizontal[i] != 0){
      for(let j = i + 1; j < horizontal.length; j++){
        if (horizontal[i] == horizontal[j] && horizontal[j] != 0) return false;
      }
    }
  }
  return true;
}

// Kiểm tra hợp lệ
function verify(arr = []){
  let t = 0;
  for(let i = 0; i < 9; i++){
    if (i > 0 && i % 3 == 0) t++;
    let p = t * 27 + Math.ceil(i % 3) * 3;
    if (!verifySquare(p , arr)) return false;
    if (!verifyVertical(i, arr)) return false;
    if (!verifyHorizontal(i * 9, arr)) return false;
  }
  return true;
}

function createTable(){
  const arr = new Array(9*9).fill(undefined).map((b, i) => {
    b = document.createElement("td");
    // cho phép thay đổi trong div
    b.setAttribute("contenteditable",true);
    b.id = `b${i}`;
    b.innerText = 0;
    return b;
  }); 
  // vẽ 2 dấu phân cách dọc mỗi 3 ô
  for(let i = 0; i < 9; i++){
    arr[i*9 + 2].setAttribute("style","border-right: 2px solid black;");
    arr[i*9 + 5].setAttribute("style","border-right: 2px solid black;");
  }
  
  // Tìm vị trí ngẫu nhiên trong bảng và set cho chúng giá trị ngẫu nhiên
  const m = Math.floor(Math.random()*(18 + 1 - 12) + 12);
  for(let i = 0; i < m; i++){
    const p = Math.floor(Math.random()*(81 - 0) + 0);
    if (arr[p].innerText == 0){
      do{
        arr[p].innerText = Math.floor(Math.random()*(9 + 1 - 1) + 1);
      }
      while(!verify(arr));
      arr[p].setAttribute("contenteditable",false);
      arr[p].classList.add("random");
      arr[p].setAttribute("unchange","true");
    }
  }

  return arr.map(b => {
    if (b.innerText === "0") b.innerText = "";
    return b;
  });
}


function setZeroToInputDiv(arr = [], isCheck){
  for(let i = 0; i < arr.length; i++){
    if (arr[i].getAttribute("unchange") == null && !isCheck){
      arr[i].innerText = 0;
    }
    else if (arr[i].getAttribute("unchange") == null && isCheck){
      if (arr[i].innerText.trim() == "") arr[i].innerText = 0;
    }
  }
  return arr;
}

// function setZeroToCheck(arr = []){
//   for(let i = 0; i < arr.length; i++){
//     if (arr[i].getAttribute("unchange") == null && arr[i].innerText == ""){
//       arr[i].innerText = 0;
//     }
//   }
//   return arr;
// }

// Dùng thuật toán truy hồi - giống như bài con mã đi tuần
let count = 0;
function autoSolve(arr = []){
  // console.log(count);
  // console.log(arr.map(a => {return a.innerText}));
  if (count > 80) return;
  else if (arr[count].getAttribute("unchange") != null){
    ++count;
    autoSolve(arr);
  }
  else if (arr[count].getAttribute("unchange") == null){
    for(let i = 1; i <= 9; i++){
      // Gán vị trí hiện tại bằng i từ 1 -> 9
      arr[count].innerText = i;
      // Kiểm tra hợp lệ
      console.log(`arr[${count}] = ${i}`);
      if (verify(arr)) {
        // Nếu hợp lệ thì qua vị trí tiếp theo. Và lại gán vị trí tiếp theo bằng i từ 1 -> 9
        ++count;
        autoSolve(arr);
      }
    }
    arr[count].innerText = 0;
    --count;
  }
}


window.onload = function(){
  const table = document.getElementById("table");
  const reset = document.getElementById("resetBtn");
  const as = document.getElementById("asBtn");
  const check = document.getElementById("checkBtn");
  const arr = createTable();
  for(let i = 0; i < 9; i++){
    const tr = document.createElement("tr");
    for(let j = 0; j < 9; j++){
      tr.appendChild(arr[j + i * 9]);
    }
    table.appendChild(tr);
  }
  // console.log(verifySquare(30, arr));
  // console.log(`Verify square: ${verify(arr)}`);

  reset.onclick = function(){
    window.location.reload();
  }

  as.onclick = function(){
    count = 0;
    autoSolve(setZeroToInputDiv(arr, false), 0);
    console.log("\n"+arr.map(a => a = a.innerText).toString());
  }

  check.onclick = function(){
    console.log(`Verify all: ${verify(setZeroToInputDiv(arr, true))}`);
  }
}