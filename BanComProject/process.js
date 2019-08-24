const prices = ["15","17","25","30"];
const listOrder = document.getElementById("list-order");
let list_order = [];
function Calc(){
  let price = 0;
  list_order.forEach(item => {
    price += parseInt(item.price);
  });
  document.getElementById("ttp").innerHTML = `Tổng cộng: ${price}.000đ`;
}
function loadDish(){
  document.querySelectorAll("#item").forEach((item,i) => {
    const price_position = i - 4 * Math.floor(i / 4);
    const name = `Dish ${i}`;
    const price = `${prices[price_position]}`;
    item.setAttribute("foodkey",`${i}`);
    item.innerHTML = `${name}<br>Price: ${price}.000đ`;
    item.addEventListener("click",() => {
      const Dish = {
        name:name,
        price:price,
        foodkey:i,
        amount:1
      };
      list_order.push(Dish);
      listOrder.innerHTML += `<li foodkey="${i}">
                                <div class="dish-infor">
                                  <div>${name}</div>
                                  <div>${price}.000đ</div>
                                  <div onclick="DeleteOrderDish(this)">&#10060;</div>
                                </div>
                              </li>`;
      Calc();
    });
  })
}
function DeleteOrderDish(element = new HTMLElement()){
  const parent = element.parentElement.parentElement;
  const foodkey = parent.getAttribute("foodkey");
  list_order.forEach((item,i) => {
    if (item.foodkey.toString() === foodkey){
      if (i !== list_order.length - 1){
        const tmpList1 = list_order.slice(0,i);
        const tmpList2 = list_order.slice(i+1);
        list_order = tmpList1.concat(tmpList2);
      }
      else list_order.pop();
    }
  });
  parent.innerHTML = "";
  parent.style.display = "none";
  Calc();
}
function TotalBoardAnimation(){
  const calc = document.getElementById("calc");
  const glass = document.getElementById("glass");
  const board = document.getElementById("board");
  calc.addEventListener("click",() => {
    glass.style.display = "block";
    board.style.right = "0";
  });
  glass.addEventListener("click",() => {
    glass.style.display = "none";
    board.style.right = "-30%";
  });
}
window.onload = () => {
  loadDish();
  TotalBoardAnimation();
}