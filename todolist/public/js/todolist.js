function addEvent(jqueryElement){
  jqueryElement.on("click",function(){
    if ($(this).attr("checked") === undefined){ // nếu như chưa check - sau này sẽ xử lý bằng cấu trúc dữ liệu
      $(this).children().eq(0).toggleClass("none"); // hiện ra cái dấu check
      $(this).parent().parent().next().css("text-decoration","line-through");
      $(this).css({
        background: "rgb(20, 184, 69)",
        border: "2px solid rgb(20, 184, 69)",
        color: "white"
      });
      $(this).attr("checked",""); // đánh dấu đã checked rồi
    }
  });
}

$(function(){
  let amount = 0;
  const socket = io();
  $("#add-btn").on("click",function(){
    $(".container-addtask").css("left","0%");
  });
  $("#back").on("click",function(){
    $(".container-addtask").css("left","100%");
    $("textarea").val("");
  });
  $("form").submit(function(e){
    e.preventDefault(); // ngăn ko cho page reload lại
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
      addEvent($(`#task-${amount-1}`).next()); // cái này là cái checkbox
      // ========================== Socket Process ============================== //
      socket.emit("send note",{
        id: amount, // amount đã được ++ ở trên
        work: todo,
        date: time,
        checked: false
      });
    }
  });
  // console.log(data_from_server);
  addEvent($("div#checkbox"));
});

// document.getElementById("checkbox")