const express = require("express");
const app = express();
const path = require("path");
const socketIO = require("socket.io");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT | 5001;
const axios = require('axios');
// const address = require("address");
const session = require('express-session');
app.use(session({
  secret:"thisisasecret",
  resave:true,
  saveUninitialized:true
}));
const captcha = require("nodejs-captcha");

function getCapPack(){
  // Create new Captcha
  var newCaptcha = captcha();
    
  // Value of the captcha
  var value = newCaptcha.value

  // Image in base64 
  var imagebase64 = newCaptcha.image;

  // Width of the image
  var width = newCaptcha.width;

  // Height of the image
  var height = newCaptcha.heigth;
  
  return {
    value: value,
    imgBase64: imagebase64,
    width: width,
    height: height
  }
}

app.engine('handlebars', exphbs({defaultLayout:'main'})); 
app.set('view engine', 'handlebars');

// use public resources such as css, js client side
app.use(express.static(path.join(__dirname,"public")));
// use socket module for client side 
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res) => {
  if (!req.session.logged){
    res.redirect("/login");
  }
  else{
    // getallmsg chỉ thực thi kho reload lại trang web
    axios.default.post('http://localhost:5000/getallmsg')
    .then(r => {
      console.log(r.data);
      res.render("room", {msgList: r.data, username: req.session.username});
    })
    .catch(err => {
      throw err;
    })
  }
  
});

app.get("/login", (req, res) => {
  if (req.session.logged){
    res.redirect("/");
  }
  let capPack = getCapPack();
  req.session.captcha = capPack.value;
  res.render("login", {capPack: capPack});
});

app.get("/register", (req, res) => {
  if (req.session.logged){
    res.redirect("/");
  }
  res.render("register");
});

app.post("/login", (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  const captcha = req.body.captcha.trim();
  if (captcha.localeCompare(req.session.captcha) == 0){
    axios.default.post("http://localhost:5000/login",{
      username: username,
      password: password
    })
    .then(rs => {
      if (!rs.data) res.render("login", {error: !rs.data});
      else{
        req.session.username = username;
        req.session.logged = true;
        res.redirect("/");
      }
    });
  }
  else {
    let capPack = getCapPack();
    req.session.captcha = capPack.value;
    res.render("login", {captcha_error: true, capPack: capPack});
  }
});

app.post("/register", (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  const repassword = req.body.repassword.trim();
  if (password == repassword){
    axios.default.post("http://localhost:5000/register",{
      username: username,
      password: password
    })
    // rs = {error: boolean, msg: string}
    .then(rs => {
      if (rs.error){
        res.render("register", rs);
      }
      else{
        res.redirect("/login");
      }
    })
    .catch(err => {throw err});
  }
  else res.render("register",{
    error: true,
    msg: "Nhập password sai"
  });

})

// server này là để load front end
const server = app.listen(PORT,() => {
  console.log(`Server is running on PORT: ${PORT} !!!!`);
});

const io = socketIO(server);

io.on("connection", socket => {

  io.on("connect", () => {
    // console.log(`someone is connected`);
    // console.log(socket.request.session);
  })

  socket.on("POST_MSG", packet => { // packet = {msg: string}
    // packet.userName = session.username; // thêm thuộc tính userName vào packet
    axios.default.post('http://localhost:5000/addblockmsg', packet)
    .then((res) => {
      console.log(res.data);
      io.emit("SEND_MSG_TO_ALL", {
        packet: res.data.packet,
        timeStamp: res.data.timeStamp
      });
    })
    .catch((error) => {
      throw error;
    });
  });
});