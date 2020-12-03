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
    for(let j = i + 1; j < square.length; j++){
      if (square[i] == square[j]) return false;
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
    for(let j = i + 1; j < vertical.length; j++){
      if (vertical[i] == vertical[j]) return false;
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
  console.log(horizontal);
  for(let i = 0; i < horizontal.length; i++){
    for(let j = i + 1; j < horizontal.length; j++){
      if (horizontal[i] == horizontal[j]) return false;
    }
  }
  return true;
}

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
    // b.setAttribute("contenteditable",true);
    b.id = `b${i}`;
    b.innerText = i;
    return b;
  }); 
  // vẽ 2 dấu phân cách dọc mỗi 3 ô
  for(let i = 0; i < 9; i++){
    arr[i*9 + 2].setAttribute("style","border-right: 2px solid black;");
    arr[i*9 + 5].setAttribute("style","border-right: 2px solid black;");
  }
  
  // Tìm vị trí ngẫu nhiên trong bảng và set cho chúng giá trị ngẫu nhiên
  // for(let i = 0; i < 9; i++){
  //   let p = Math.floor(Math.random()*(81 - 0) + 0);
  //   arr[p].innerText = Math.floor(Math.random()*(9 + 1 - 1) + 1);
  //   arr[p].setAttribute("contenteditable",false);
  //   arr[p].classList.add("random");
  // }

  return arr;
}


window.onload = function(){
  const table = document.getElementById("table");
  const arr = createTable();
  for(let i = 0; i < 9; i++){
    const tr = document.createElement("tr");
    for(let j = 0; j < 9; j++){
      tr.appendChild(arr[j + i * 9]);
    }
    table.appendChild(tr);
  }
  // console.log(verifySquare(30, arr));
  console.log(`Verify square: ${verify(arr)}`);
}