window.onload = () => {
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