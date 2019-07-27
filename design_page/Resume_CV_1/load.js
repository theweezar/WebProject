/**
 * Mới đầu vào thì previous sẽ = 1. Vì Profile sẽ dc load ra đầu tiên và nó có id = item-1
 * if (current !== previous) ko được click vào thằng đã được active
 * str.slice(-1) lấy kí tự cuối cùng của string
 */

let previous = "1"; // document.getElementsByClassName("active")[0].id.slice(-1);
document.querySelectorAll("tr").forEach(item => {
  item.addEventListener("click",() => {
    let current = item.id.slice(-1); 
    if (current !== previous && item.id !== "tr0"){
      document.getElementById(`item-${current}`).classList.add("active");
      document.getElementById(`item-${previous}`).classList.remove("active");
      previous = current;
    }
  });
});