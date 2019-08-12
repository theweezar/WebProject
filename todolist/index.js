const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");
// dòng trên có nghĩa là đỡ mắc công tạo thêm 1 const như là const IO = io(http);
const PORT = process.env.PORT || 8080;

let list = [];

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));
// dùng npm install --save socket.io nó tải về nguyên cái bộ socket cho mình gồm cho server và client
// app.use này là để dùng cái bản io client

app.get("/",(req,res) => {
  // p.split(/[{-}]/g);
  fs.readFile(path.join(__dirname,"private","work.txt"),"utf8",(err,data) => {
    if (err) throw err;
    let note = data.split(/[{-}]/g);
    console.log(note);
    note.forEach((work,i) => {
      if (i % 2 !== 0){
        list.push(`{${work}}`);
      }
    });
    res.render("todolist",{note:note});
  })
});

io.on("connection",socket => {
  // io là đường truyền input outpunt
  // socket này có thể được coi là 1 cái modem kết nối mọi cái đường truyền lại với nhau
  console.log("user is connected");
  // mỗi lần có 1 user nào đó kết nối tới server thành công qua socket thì nó sẽ báo trong cái console
  socket.on("disconnect",() => {
    console.log("disconnected");
  });
  // nếu như user disconnect thì socket sẽ làm 1 thông báo
  socket.on("send note",note => {
    // console.log(JSON.stringify(note));
    list.push(JSON.stringify(note));
    console.log(list.toString());
    fs.writeFile(path.join(__dirname,"private","work.txt"),list.toString(),err => {
      if (err) throw err;
    });
  });
});

http.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
});