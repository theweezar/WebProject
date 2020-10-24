const express = require("express");
const app = express();
const path = require("path");
const socketIO = require("socket.io");
const exphbs = require("express-handlebars");
const fs = require("fs");
const PORT = process.env.PORT | 5000;
const session = require("express-session");
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const mysql = require("mysql");

app.engine('handlebars', exphbs({defaultLayout:'main'})); 
app.set('view engine', 'handlebars');

// use public resources such as css, js client side
app.use(express.static(path.join(__dirname,"public")));
// use socket module for client side 
app.use(express.static(path.join(__dirname,"node_modules","socket.io-client","dist")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res) => {
  res.render("room");
});

const server = app.listen(PORT,() => {
  console.log(`Server is running on PORT: ${PORT} !!!!`);
})

const io = socketIO(server);

io.on("connection", socket => {
  
});