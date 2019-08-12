const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const fs = require("fs");
// dòng trên có nghĩa là đỡ mắc công tạo thêm 1 const như là const IO = io(http);
const PORT = process.env.PORT || 8080;

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));
// dùng npm install --save socket.io nó tải về nguyên cái bộ socket cho mình gồm cho server và client
// app.use này là để dùng cái bản io client

app.get("/",(req,res) => {
  // p.split(/[{-}]/g);
  res.render("todolist");
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
    console.log(note);
  });
});

http.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
});