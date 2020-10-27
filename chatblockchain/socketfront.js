const express = require("express");
const app = express();
const path = require("path");
const socketIO = require("socket.io");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT | 5001;
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const axios = require('axios');

app.engine('handlebars', exphbs({defaultLayout:'main'})); 
app.set('view engine', 'handlebars');

// use public resources such as css, js client side
app.use(express.static(path.join(__dirname,"public")));
// use socket module for client side 
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res) => {
  axios.default.post('http://localhost:5000/getallmsg')
  .then(r => {
    console.log(r.data);
    res.render("room", {msgList: r.data});
  })
  .catch(err => {
    throw err;
  })
});

// server này là để load front end
const server = app.listen(PORT,() => {
  console.log(`Server is running on PORT: ${PORT} !!!!`);
});

const io = socketIO(server);

io.on("connection", socket => {
  socket.on("POST_MSG", packet => {
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