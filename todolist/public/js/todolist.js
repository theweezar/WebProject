function validation(input = ""){
  if (input.trim() === "") return false;
  return true;
}

function addEvent(jqueryElement){
  jqueryElement.on("click",function(){
    if ($(this).attr("checked") === undefined){
      $(this).children().eq(0).toggleClass("none");
      $(this).parent().parent().next().css("text-decoration","line-through");
      $(this).css({
        background: "rgb(20, 184, 69)",
        border: "2px solid rgb(20, 184, 69)",
        color: "white"
      });
      $(this).attr("checked","");
    }
  });
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
      addEvent($(`#task-${amount-1}`).next());
    }
  });
  addEvent($("div#checkbox"));
});

// document.getElementById("checkbox")