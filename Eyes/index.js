const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT | 8080;

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