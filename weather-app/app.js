const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const request = require('request');
const exphbs  = require('express-handlebars');
const PORT = process.env.PORT || 8080;
//https://api.darksky.net/forecast/e08bc4e99f5901c95918de49808b4357/37.8267,-122.4233

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

app.get('/',(req,res) => {
  const getAPI = new Promise((resolve,reject) => {
    request({
      method:"GET",
      uri:"https://api.darksky.net/forecast/e08bc4e99f5901c95918de49808b4357/37.8267,-122.4233"
    },(err,body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
  getAPI.then(rs => {
    // console.log(rs.body);
    const str = JSON.stringify(rs.body);
    res.render('app',{data : str});
    // fs.writeFile(path.join(__dirname,'JSON','weather.JSON'),rs.body,(err) => {
    //   if (err) throw err;
    //   res.end();
    // });
    // res.end();
  }).catch(err => {throw err;});
});

app.listen(PORT,() => {
  console.log(`Your app is running on ${PORT}`);
});