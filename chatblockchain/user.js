const mysql = require("mysql");
const tbName = "users";

class Users{
  constructor(connection = mysql.createConnection()){
    this.conn = connection;
  }

  addUser(username,password){
    this.conn.query(`INSERT INTO ${tbName} (username,password) VALUES
    ('${username}','${password}')`, err => {
      if (err) throw err;
    });
  }

  getAll(){
    return new Promise((resolve,reject) => {
      this.conn.query(`SELECT * FROM ${tbName}`, (err, rs) => {
        if (err) reject(err);
        else resolve(rs);
      });
    });
  }

  getUser(username){
    return new Promise((resolve,reject) => {
      this.conn.query(`SELECT * FROM ${tbName} WHERE username='${username}'`, (err, rs) => {
        if (err) reject(err);
        else resolve(rs);
      });
    });
  }
  
}


module.exports = Users;