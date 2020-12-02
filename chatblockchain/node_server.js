const express = require("express");
const app = express();
const path = require("path");
// const socketIO = require("socket.io");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT | 5000;
// const session = require("express-session");
const mysql = require("mysql");
const userTb = require("./user");
const SHA256 = require("crypto-js/sha256");

const conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"test"
});

const user = new userTb(conn);


const BlockChain = require("./blockchain");
const chain = new BlockChain();

app.engine('handlebars', exphbs({defaultLayout:'main'})); 
app.set('view engine', 'handlebars');

// use public resources such as css, js client side
app.use(express.static(path.join(__dirname,"public")));
// use socket module for client side 
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post("/request", (req, res) => {
  res.send("requested");
})

// getallmsg chỉ thực thi kho reload lại trang web
app.post("/getallmsg", (req, res) => {
  let c = chain.getChain().map(block => {
    let time = new Date(block.timeStamp);
    let timeStr = `${time.getDate() < 10 ? "0" + time.getDate():time.getDate()}-${time.getMonth()+1 < 10 ? "0"+time.getMonth()+1:time.getMonth()+1}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()}`;
    block.timeStr = timeStr;
    return block;
  });
  res.send(c);
});

app.post("/addblockmsg", (req, res) => {
  chain.addBlock(req.body.userName, req.body.msg);

  res.send(chain.lastBlock());
});

app.post("/getchain", (req, res) => {
  res.send(chain.getChain());
})

app.post("/login",async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  const hash = SHA256(password).toString();
  console.log(hash);
  const userExist = await user.getUser(username);
  if (userExist.length == 0) res.send(false);
  else if (hash.localeCompare(userExist[0].password) == 0) res.send(true);
  else res.send(false);
})

app.post("/register",async (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  const userExist = await user.getUser(username);
  if (userExist.length == 0){
    const hash = SHA256(password).toString();
    user.addUser(username, hash);
    res.send({
      error: false,
      msg: "Đăng kí thành công. Chuyển hướng về trang đăng nhập"
    });
  }
  else{
    res.send({
      error: true,
      msg: "Username đã tồn tại"
    });
  }
  
})

// server này là để xử lý backend
const server = app.listen(PORT,() => {
  console.log(`Server is running on PORT: ${PORT} !!!!`);
});