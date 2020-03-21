const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT | 8080;

app.get("/",(req,res) => {
  var p = new Promise((rs,rj) => {
    fs.readdir("C:\\Users\\hpmdu\\Music",(err,data) => {
      if (err) rj(err);
      else rs(data);
    });
  })
  .then(rs => {
    res.end(`${rs}`);
  })
  .catch(err => {throw err;})
})

io.on("connection",socket => {
  console.log("Connection is established !");
  socket.on("connect",() => {
    console.log("Admin is connected !");
  });
  socket.on("disconnect",() => {
    console.log("Disconnected");
  });
  // ================================================= //

})

http.listen(PORT,() => {
  console.log(`Server is running on PORT : ${PORT}`);
})