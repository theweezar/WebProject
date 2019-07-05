const fs = require('fs');
const path = require('path');

function loadImg(){
  return new Promise((onSuccess,onErr) => {
    fs.readdir(path.join(__dirname,'img'),(err,files) => {
      if (err) onErr(err);
      else onSuccess(files);
    });
  });
}

loadImg().then(files => {console.log(files);});