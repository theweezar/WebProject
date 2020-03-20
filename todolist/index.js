const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('./private/Note.db');
const TABLENAME = "note";
// const fs = require("fs");
// dòng trên có nghĩa là đỡ mắc công tạo thêm 1 const như là const IO = io(http);
const PORT = process.env.PORT || 8080;

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));
// dùng npm install --save socket.io nó tải về nguyên cái bộ socket cho mình gồm cho server và client
// app.use này là để dùng cái bản socket.io.js client

const createTable = (req,res,next) => {
  db.run(`CREATE TABLE IF NOT EXISTS ${TABLENAME} (
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    checked INT
  )`);
  next();
};

const add = (note = {content:"",date:"",checked:0}) => {
  db.run(`INSERT INTO ${TABLENAME} VALUES(
    '${note.content}',
    '${note.date}',
    ${note.checked}
  )`);
  db.each(`SELECT rowid AS id, * FROM ${TABLENAME}`,(err,row) => {
    if (err) reject(err);
    console.log(row);
  });
};

const del = id => {
  db.run(`DELETE FROM ${TABLENAME} WHERE rowid = ${id}`);
}

const getAll = () => {
  return new Promise((resolve,reject) => {
    db.all(`SELECT rowid AS id, * FROM ${TABLENAME}`,(err,row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

app.get("/",createTable,(req,res) => {
  // p.split(/[{-}]/g);
  getAll()
  .then(note => {
    res.render("todolist",{notelist:JSON.stringify(note)});
    console.log(JSON.stringify(note));
  })
  .catch(err => {
    throw err;
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
    // ở đây biến note là dữ liệu được gửi từ client về server
    console.log(note);
    add(note);
  });
  // nếu như user tạo 1 note thì sẽ được lưu vào database
  socket.on("check note",note => {
    console.log(`note ${note.checkID} is checked`);
    del(note.checkID.slice(5,note.checkID.length));
  });
  // nếu như user đã làm xong việc được note và user check vào ô vuông thì note sẽ được xóa khỏi db
});

http.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
});