const url = require("url");

const myURL = new URL("https://www.google.com:8000/");

console.log(myURL.href);

console.log(myURL.host); // có thêm port 8000

console.log(myURL.hostname); // ko có port 8000 chỉ hiển thị cái link

console.log(myURL.search);