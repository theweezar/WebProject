const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

app.get("/",(req,res) => {
  res.end();
});

app.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`);
});