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
// app.use này là để dùng cái bản io client

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
};

const getAll = () => {
  return new Promise((resolve,reject) => {
    let list = [];
    db.each(`SELECT rowid AS id, * FROM ${TABLENAME}`,(err,row) => {
      if (err) reject(err);
      list.push(row);
    });
    resolve(list);
  });
};

app.get("/",createTable,(req,res) => {
  // p.split(/[{-}]/g);
  // Note.createTable();
  getAll()
  .then(note => {
    res.render("todolist");
    console.log(note);
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
    console.log(note);
    add(note);
  });
});

http.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
});