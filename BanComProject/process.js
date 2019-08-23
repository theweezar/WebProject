const prices = ["15","17","25","30"];
let list_order = [];
function loadDish(){
  document.querySelectorAll("#item").forEach((item,i) => {
    const price_position = i - 4 * Math.floor(i / 4);
    const name = `Dish ${i}`;
    const price = `Price: ${prices[price_position]}.000`;
    item.setAttribute("foodkey",`${i}`);
    item.innerHTML = `${name}<br>${price}`;
    item.addEventListener("click",() => {
      list_order.push({
        name:name,
        price:price
      });
      console.log({
        name:name,
        price:price
      });
    });
  })
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