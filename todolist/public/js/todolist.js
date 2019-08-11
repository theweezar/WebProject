function validation(input = ""){
  if (input.trim() === "") return false;
  return true;
}
$(function(){
  let amount = 0;
  $("#add-btn").on("click",function(){
    $(".container-addtask").css("left","0%");
  });
  $("#back").on("click",function(){
    $(".container-addtask").css("left","100%");
    $("textarea").val("");
  });
  $("#done").on("click",function(){
    const todo = $("textarea").val();
    if (!validation(todo)){
      // báo lỗi hay gì đó
    }
    else{
      const date = new Date();
      const time = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ( ${date.getHours()}:${date.getMinutes()} )`;
      const li = `<li>
                    <div class="input-checkbox">
                      <label for="task-${amount}">
                        <input type="checkbox" name="" id="task-${amount++}">
                        <div id="checkbox"><span class="none">&#10004;</span></div>
                      </label>
                    </div>
                    <div class="content">
                      ${todo}
                      <div class="date">${time}</div>
                    </div>
                  </li>`
      $("#todo-list").append(li);
      $(".container-addtask").css("left","100%");
      $("textarea").val("");
      $(`#task-${amount-1}`).next().on("click",function(){ // phải add thêm event cho thằng mới vào
        $(this).children().eq(0).toggleClass("none");
      });
    }
  });
  $("div#checkbox").on("click",function(){
    $(this).children().eq(0).toggleClass("none");
  });
});

// document.getElementById("checkbox")