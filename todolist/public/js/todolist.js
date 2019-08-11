let amount = 0;

function validation(input = ""){
  if (input.length === 0) return false;
  return true;
}

$(function(){
  $("#add-btn").on("click",function(){
    $(".container-addtask").css("left","0%");
  })
  $("#back").on("click",function(){
    $(".container-addtask").css("left","100%");
    $("textarea").val("");
  })
  $("#done").on("click",function(){
    const todo = $("textarea").val();
    if (!validation(todo)) alert("Please fill the blank !");
    else{
      const date = new Date();
      const time = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ( ${date.getHours()}:${date.getMinutes()} )`;
      const li = `<li>
                    <div class="input-checkbox">
                      <label for="task-${amount}">
                        <input type="checkbox" name="" id="task-${amount++}">
                        <div class="checkbox"></div>
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
    }
  })
  $(".checkbox").on("click",function(){
    $(this).html("&#10004;");
    $(this).parent().parent().parent().fadeOut(1000);
  })
});