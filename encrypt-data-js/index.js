const express = require('express'); // framework express
const fs = require('fs'); // File system dùng để truy cập lên file hệ thống
const path = require('path'); // tùy chỉnh mấy cái đường link của file
const app = express();
const exphbs  = require('express-handlebars'); // view engine dùng cho show data ra front end
const PORT = process.env.PORT || 5000;
const CryptoJS = require('crypto-js');

app.engine('handlebars', exphbs({defaultLayout:'main'})); // set cái layout mặc định là file main.handlebars
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname,'public')));
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get("/", (req, res) => {
  res.render('home');
});

app.post("/encrypt", (req, res) => {
  const plain = JSON.stringify(req.body.arrayFileBase64);
  const password = req.body.password; // duc, 123
  if (password.length != 0){
    // CryptoJS.enc.Utf8
    const hashPassword = CryptoJS.SHA256(password).toString();
    console.log(plain);
    console.log(hashPassword);
    const cipher = CryptoJS.TripleDES.encrypt(plain, hashPassword);
    res.send(cipher.toString());
  }
});

app.post("/decrypt", (req, res) => {
  const cipher = req.body.arrayFileBase64;
  const password = req.body.password;
  if (password.length != 0 && cipher.length == 1){
    // CryptoJS.enc.Utf8
    const hashPassword = CryptoJS.SHA256(password).toString();
    const plain = CryptoJS.TripleDES.decrypt(cipher[0],hashPassword).toString(CryptoJS.enc.Utf8);
    console.log(plain);
    res.send(JSON.parse(plain));
  }
})

app.listen(PORT, () => {
  console.log(`This server is running on port ${PORT}`);
})
