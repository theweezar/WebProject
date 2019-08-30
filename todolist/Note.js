const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('./private/Note.db');

module.exports = {
  CreateTable : () => {
    db.run(`CREATE TABLE IF NOT EXISTS note (
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      check INT NOT NULL
    )`);
  },
  Add : (note = {content:"",date:"",check:0}) => {
    db.run(`INSERT INTO note VALUES(
      '${note.content}',
      '${note.date}',
      ${note.check}
    )`)
  }
};