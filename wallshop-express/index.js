const express = require('express'); // framework express
const fs = require('fs'); // File system dùng để truy cập lên file hệ thống
const path = require('path'); // tùy chỉnh mấy cái đường link của file
const app = express();
const api = require('./files_api');
const exphbs  = require('express-handlebars'); // view engine dùng cho show data ra front end
const multer = require('multer'); // dùng để upload file lên server rồi gửi vào database
const upload = multer({dest:path.join(__dirname,'img')});
const session = require('express-session');
app.use(session({ // mỗi ghi gọi tới session thì session sẽ dc định nghĩa như thế này
  secret: 'gofuckyourself', // sercret key
  resave:true, // resave là lưu lại, nếu set false thì mỗi khi tắt hết trang app đó đi thì sẽ mất hết
  saveUninitialized: true,
  // ko cho session lưu trên store vì đăng nhập trên nhiều trình duyệt cùng 1 máy tính có thể thông tin sẽ bị ghi đè
  cookie:{}
}));
// const url = require('url');
const PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout:'main'})); // set cái layout mặc định là file main.handlebars
app.set('view engine', 'handlebars');

const admin = {username:'admin',password:'admin'};
// middleware là gì ? middleware là 1 phương thức hoặc function khi người dùng gọi tới bất cứ địa chỉ nào thì 
// server side sẽ thực hiện những function đó, nếu chúng dc gọi ra
// ví dụ const sayHello = () => {console.log("hello world!");} // đây là 1 arrow function đơn giản
// app.use(sayHello()); mỗi lần gọi tới bất kỳ địa chỉ nào thì hàm này sẽ dc gọi tới

app.use(express.static(path.join(__dirname,'public')));
// dòng này có nghĩa là nếu như truy cập vào 1 trong những file.html ở trong folder public thì nó sẽ tự động
// chạy những file đó
app.use('/style',express.static('style')); 
// tự động load và chạy file css, và tự động định nghĩa lại content-type luôn là text/css
app.use('/img',express.static('img'));
// tự động định nghĩa và load ảnh mỗi khi request tới
app.use('/js',express.static('js'));
// tự động load những file js dành cho front end
app.use(express.json()); // middleware này sẽ tạo 1 object JSON mỗi khi request theo method POST GET
app.use(express.urlencoded({extended:false}));// middleware này sẽ tạo nên các biến con trong JSON đó

// app.use có dùng để tạo 1 middleware, mỗi khi người dùng gọi tới những item trong những folder này, thì nó sẽ tự động
// load ra và định nghĩa cho đúng cái loại file đó luôn, nhưng phải gọi đúng địa chỉ

app.get('/',(req,res) => {
  api.getFiles('img').then(rs => { // rs: results : kết quả dc trả về từ hàm api.getFiles
    if (!req.session.logged) res.render('albums',{pics:rs, logged:false});
    else res.render('albums',{pics:rs, logged:true});
  }).catch(err => {throw err;});
});

const RedirectHome = (req,res,next) => { // nếu đã đăng nhập rồi thì ko được truy cập /login, /register
  if (req.session.logged){
    res.redirect('/');
  }
  else next();
};

const RedirectLogin = (req,res,next) => { // nếu chưa đăng nhập thì ko được truy cập vào /upload, /logout
  if (req.session.logged){
    next();
  }
  else res.redirect('/login');
};

app.get('/login',RedirectHome,(req,res) => {
  res.render('login',{layout:'log'}); // có thể thay đổi file layout bằng cách này, nó sẽ tự động render cho mình
});
app.post('/login',(req,res) => {
  // res.end(JSON.stringify(req.body)); // == string
  if (req.body.username === admin.username && req.body.password === admin.password){
    req.session.username = admin.username;
    req.session.logged = true; // đã đăng nhập
    res.redirect('/');
  }
  else{
    res.render('login',{layout:'log',error:true});
  }
});
app.get('/logout',RedirectLogin,(req,res) => { // có thể sử dụng cả middleware ghi gửi 1 request
  req.session.destroy();
  res.redirect('/');
});
// app.get('/:user/post',(req,res) => { // vd: localhost:8080/admin/post => user = admin
//   res.end(req.params.user);
// });
app.get('/upload',RedirectLogin,(req,res) => {
  res.render('upload',{logged:true});
});
app.post('/upload',upload.single('upload-img'),(req,res) => {
  // hàm upload.single này sẽ tự động tạo 1 file trắng có dữ liệu từ file mới truyền vào, nhưng chưa có đuôi file
  const tempPath = req.file.path; // đường link của file trong máy
  const extname = path.extname(req.file.originalname).toLocaleLowerCase(); // lấy đuôi file: .jpg, .png, ....
  const targetPath = path.join(__dirname,'img',req.file.filename + extname); // đường link save file đến trong server
  // ta sẽ dùng module fs để sửa lại tên của file trắng mới được tạo để gắn thêm đuôi file là jpg hoặc .....
  fs.rename(tempPath, targetPath, err => {
    if (err) throw err;
    res
      .status(200)
      .contentType("text/plain")
      .redirect('/');
  });
  // sau khi upload thành công thì ta sẽ chuyển hướng về trang chủ
});

app.get('/*',(req,res)=>{ 
  if (req.session.logged) res.render('pagenotfound',{logged:true});
  else res.render('pagenotfound');
});

app.listen(PORT,()=>{
  console.log(`Server is running on PORT : ${PORT}`);
  // cái này giống như loop nếu mà truy cập lại nó sẽ reload lại để chạy lại từ đầu
});