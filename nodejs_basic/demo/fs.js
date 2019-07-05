// cách tạo file và viết file
const path = require("path");
const fs = require("fs");
const filename = "file_txt";

function CreateFolder(){
  fs.mkdir(
    path.join(__dirname,filename), // xem bên file path.js có ví dụ của path.join
    {},
    err => {
      if (err) throw err; // err là biến có sẵn dc khởi tạo trong hàm mkdir luôn, nếu có err thì nó sẽ quăng lên console
      else console.log("Folder Created...");
    }
  )
}

function WriteSomething(data = ""){ // viết vào file - bằng cách đè chứ ko phải append
  fs.writeFile(
    path.join(__dirname,filename,"test.txt"), // có thể ghi lại như thế này filename + "/test.txt" cũng chạy
    data,
    function(err) {
      if (err) throw err;
      else console.log("Data : "+data);
    }
  )
}

function ReadFile(){ // đọc file
  fs.readFile(
    path.join(__dirname,filename,"test.txt"),
    "utf8", // phải để cách mã hóa là gì, nếu ko để nó sẽ ra 1 cái chuỗi lạ 
    (err,data)=>{
      if (err) throw err;
      else console.log(data);
    }
  )
}

// WriteSomething("What the fuck is this ?");
ReadFile();