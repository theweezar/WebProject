const fs = require('fs');
const path = require('path');

module.exports = {
  getFiles : (link='') => {
    return new Promise((onSuccess,onErr) => {
      fs.readdir(path.join(__dirname,link),(err,files) => {
        if (err) onErr(err);
        else onSuccess(files);
      });
    });
  }
};