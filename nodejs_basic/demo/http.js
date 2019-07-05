const http = require('http');
const port = 8080;

http.createServer((req,res)=>{ // req : request ; res : response
  res.write('<h1>Hello my friend !</h1>');
  res.write('Welcome back');
  res.end();
}).listen(port,()=>{
  console.log(`Server is running in port ${port}`);
  console.log(`[Copy this] : localhost:${port}`);
});

// phải chạy server trước thì mới có thể truy cập được vào port 8080