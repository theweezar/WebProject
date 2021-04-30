$('i[toggle="dropdown"]').on('click', function dropdown(e) {
    console.log('click')
    $(this)
    .toggleClass('fa-plus')
    .toggleClass('fa-minus')
    .parentsUntil('div.row')
    .find('ul.nav')
    .toggleClass('d-none')
})