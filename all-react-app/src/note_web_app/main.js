function dropList(){
  const dropdown = document.getElementById('dropdown-list')
  dropdown.classList.toggle('d-none')
  dropdown.classList.toggle('d-flex')
}

window.onload = function(){
  document.getElementById('dropdown-btn').addEventListener('click', dropList)
}