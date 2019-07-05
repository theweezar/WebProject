const http = require('http');
const fs = require('fs');
const path = require('path');
const tools = require('./tools');
const PORT = process.env.PORT || 8080;
// dòng này có thể là nếu port 8080 đã được sử dụng thì nó sẽ tự động sinh
// ra PORT mới

const server = http.createServer((req,res)=>{
  // Cách 1: dài dòng khó xử lý
  // if (req.url === '/'){ 
  //   // nếu như truy cập vào localhost:8080 hoặc localhost:8080/ thì nó sẽ return lại homepage
  //   // giống app.route('/') bên Flask/Python
  //   fs.readFile( // ta sẽ đọc cái file .html và gán dữ liệu đó vào biến html ở dưới, rồi ta viết ra web
  //     path.join(__dirname,'public','homepage.html'),
  //     (err,content)=>{
  //       if (err) throw err; 
  //       res.writeHead(200,{'Content-type':'text/html'}); // cho trình duyệt biết đây là file html
  //       res.end(content);
  //     }
  //   );
  // }
  // else if (req.url === '/about'){
  //   fs.readFile( // ta sẽ đọc cái file .html và gán dữ liệu đó vào biến html ở dưới, rồi ta viết ra web
  //     path.join(__dirname,'public','about.html'),
  //     (err,content)=>{
  //       if (err) throw err;
  //       res.writeHead(200,tools.contentType('.html')); // cho trình duyệt biết đây là file html
  //       res.end(content);
  //     }
  //   );
  // }
  // else {
  //   res.end('<h1>Page not found</h1>');
  // }

  // Đây là cách viết Server chay luôn => dài dòng
  // sử dụng modedule 'express' sẽ khắc phục được vấn đề này

  // Cách 2
  let filePath = path.join(__dirname,'public',req.url === '/' ? 'homepage.html':req.url);
  
  let extname = path.extname(filePath);

  fs.readFile(
    filePath,
    'utf8',
    (err,content) => {
      if (err) {
        if (err.code == 'ENOENT'){
          res.end('<h1>Page not found</h1>');
        }
        else {
          res.writeHead(500); // Server error
          res.end(`<h1>Server Error: ${err.code}</h1>`);
        }
      }
      else{
        res.writeHead(200,tools.contentType(extname));
        res.end(content);
      }
    }
  );
});

server.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`);
});
