const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const exphbs = require('express-handlebars');
const {exec} = require('child_process');
const PORT = process.env.PORT | 8080;
const DirPath = "C:\\Users\\hpmdu\\Music";

app.engine('handlebars', exphbs({defaultLayout:'main'})); // set defaultlayout is main.handlebars
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));

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
  // res.end("shit");
})

app.get("/:folder",(req,res) => {
  var p = new Promise((rs,rj) => {
    fs.readdir(path.join(DirPath,req.params.folder),(err,d) => {
      if (err) rj(err);
      else rs(d.filter(f => {
        return /.mp3/.test(f) || /.MP3/.test(f);
      }));
    })
  })
  .then(rs => {
    res.render("list",{parent:req.params.folder,songs:rs});
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
  // ============================================================== //
  socket.on("REQUEST_PLAY_A_SONG",song => {
    console.log(`${DirPath}${song.link}`);
    exec(`C: start`);
  });
});

http.listen(PORT,() => {
  console.log(`Server is running on PORT : ${PORT}`);
})