function addEvent(jqueryElement,socket){
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
      socket.emit("check note",{
        checkID:$(this).prev().attr("id") // gửi cái id = task-? về cho server xử lý
      });
    }
  });
}

function Note_li(orderNumber=0,content='',date=''){
  return `<li>
            <div class="input-checkbox">
              <label for="task-${orderNumber}"> 
                <input type="checkbox" id="task-${orderNumber}">
                <div id="checkbox"><span class="none">&#10004;</span></div>
              </label>
            </div>
            <div class="content">
              ${content}
              <div class="date">${date}</div>
            </div>
          </li>`;
}

$(function(){
  let amount = 1;
  const socket = io();
  $("#add-btn").on("click",function(){
    $(".container-addtask").css("left","0%");
  });
  $("#back").on("click",function(){
    $(".container-addtask").css("left","100%");
    $("textarea").val("");
  });
  // addEvent($("div#checkbox")); // add event cho thằng lorem làm mẫu
  NoteList.forEach((note,i) => {
    if (i % 2 != 0){
      console.log(JSON.parse(`{${note}}`));
      const n = JSON.parse(`{${note}}`);
      const li = Note_li(n.id,n.content,n.date);
      $("#todo-list").append(li);
      addEvent($(`#task-${n.id}`).next(),socket); // cái này là cái checkbox
      amount = n.id;
    }
  });
  console.log(amount);
  $("form").submit(function(e){
    e.preventDefault(); // ngăn ko cho page reload lại
    const todo = $("textarea").val();
    if (!validation(todo)){
      // báo lỗi hay gì đó
    }
    else{
      const date = new Date();
      const time = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ( ${date.getHours()}:${date.getMinutes()} )`;
      const li = Note_li(++amount,todo,time);
      $("#todo-list").append(li);
      $(".container-addtask").css("left","100%");
      $("textarea").val("");
      addEvent($(`#task-${amount}`).next(),socket); // cái này là cái checkbox
      // ========================== Socket Process ============================== //
      socket.emit("send note",{
        content: todo,
        date: time,
        checked: 0
      });
    }
  });
});

// document.getElementById("checkbox")