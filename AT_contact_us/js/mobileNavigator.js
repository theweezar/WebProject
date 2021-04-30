$('a[toggle="open-navigator"]').on('click',function(e){
    e.preventDefault()
    $('div.mobile-nav').animate({
        right: '0'
    })
})

// use touchstart to close nav when user scroll or touch something on the left page
$('div[toggle="close-navigator"]').on('touchstart',function(e){
    $('div.mobile-nav').animate({
        right: '-100%'
    })
})