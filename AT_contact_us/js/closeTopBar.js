$("img#close-top-bar-btn").bind('click', function(){
    $(this)
    .parents('div.top-bar')
    .fadeOut('0.25s')
})