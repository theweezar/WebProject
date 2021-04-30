function makeStringNumber(number){
    // Hàm này gán thêm số 0 cho mấy số bé hơn 10
    return number < 10 ? '0' + number : number
}

const interval = 1000

const countdown = new Date("Apr 30, 2021 00:00:00").getTime()

function count(){
    const now = new Date().getTime()
    
    // getTime() sẽ trả về milisecond, thì ta chia chia 1000 để có được tổng số giây
    const leftSec = (countdown - now) / 1000
    if (Math.floor(leftSec) <= 0) clearInterval(countLoop)
    else{
        const day = Math.floor(leftSec / (60 * 60 * 24))

        // % sẽ trả về tổng số giây còn lại của 1 ngày, ta phải chia tiếp tục cho số giây của 1 giờ
        // để tính ra được số giờ còn lại
        const hour = Math.floor((leftSec % (60 * 60 * 24)) / (60 * 60))

        // % sẽ trả về tổng số giây còn lại của 1 giờ, ta phải chia tiếp tục cho 60 để lấy số phút
        const min = Math.floor(leftSec % (60 * 60) / 60)
        
        // % sẽ trả về tổng số giấy còn lại của 1 phút
        const sec = Math.floor(leftSec % 60)
        // console.log('Left sec: ',leftSec,`| ${day}:${hour}:${min}:${sec}`)
        $('div.banner-countdown').text(
            `${makeStringNumber(day)}:${makeStringNumber(hour)}:${makeStringNumber(min)}:${makeStringNumber(sec)}`
        )
    }
}

const countLoop = setInterval(count, interval);
count()