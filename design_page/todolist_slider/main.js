$(function(){
  // $(`input[id="check-demo"]`).is(":checked")
  $("input[id='check-demo']").on("click",function(){
    if ($(this).is(":checked")){
      $(this).parent().next().css({display:"block"});
      $(this).unbind();
    }
    console.log("click");
  });
});