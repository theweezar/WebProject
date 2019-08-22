window.onload = () => {
  // console.log(document.querySelectorAll("#item").length);
  document.querySelectorAll("#item").forEach((item,i) => {
    item.setAttribute("foodkey",`${i}`);
    item.innerHTML = `Dish ${i}`;
  })
}