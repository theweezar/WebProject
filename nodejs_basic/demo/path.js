const path = require("path");

console.log("Basename: "+path.basename(__filename)); // Lấy tên file - ở đây tên file là path-example.js

console.log("Dirname: "+path.dirname(__filename)); // Lấy tên nguyên 1 cái cây thư mục -> D:/mini_project/nodejs_app/references

console.log("Extname: "+path.extname(__filename)); // Lấy đuôi file - đuôi file : .js

console.log("Join Dirname: "+path.join(__dirname,"pic/p1.jpg")); // lấy cái link file hiện tại gắn thêm vào pic.p1.jpg - có thể thay đổi
// cái link

console.log(path.parse(__filename)); // trả về nguyên 1 cái object JSON của file