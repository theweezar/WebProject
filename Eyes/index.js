const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const exphbs  = require('express-handlebars');
const PORT = process.env.PORT | 8080;
const DirPath = "C:\\Users\\hpmdu\\Music";

app.engine('handlebars', exphbs({defaultLayout:'main'})); // set defaultlayout is main.handlebars
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res) => {
  var p = new Promise((rs,rj) => {
    fs.readdir(DirPath,(err,d) => {
      if (err) rj(err);
      else rs(d.filter(e => {
        return fs.lstatSync(path.join(DirPath,e)).isDirectory() == true;
        // Check if the link is a directory or not 
      }));
    });
  })
  .then(rs => {
    res.render("list",{f:rs,album:true});
  })
  .catch(err => {throw err;})
})

app.get("/:folder",(req,res) => {
  var p = new Promise((rs,rj) => {
    fs.readdir(path.join(DirPath,req.params.folder),(err,d) => {
      if (err) rj(err);
      else rs(d.filter(f => {
        return /.mp3/.test(f);
      }));
    })
  })
  .then(rs => {
    res.end(`${rs}`);
  })
  .catch(err => {throw err;});
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