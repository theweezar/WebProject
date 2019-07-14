const express = require('express');
const app = express();
// const fs = require('fs');
// const path = require('path');
// const request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
const exphbs  = require('express-handlebars');
const PORT = process.env.PORT || 8080;
//https://api.darksky.net/forecast/e08bc4e99f5901c95918de49808b4357/37.8267,-122.4233

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

app.get('/',(req,res) => {
  res.render('input');
});

app.post('/',(req,res) => {
  // res.end();
  fetch(req.body.url_api)
  .then(rs => rs.text())
  .then(rs => res.end(rs))
  .catch(() => {
    res.redirect('/');
  });
});

app.get('/favicon.ico',(req,res) => { // chữa lỗi get favicon.ico failed
  res.end();
});

app.listen(PORT,() => {
  console.log(`Your app is running on ${PORT}`);
});