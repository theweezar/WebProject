
module.exports = {
  createTable : () => {
    db.run(`CREATE TABLE IF NOT EXISTS ${TABLENAME} (
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      checked INT
    )`);
  },
  add : (note = {content:"",date:"",checked:0}) => {
    db.run(`INSERT INTO ${TABLENAME} VALUES(
      '${note.content}',
      '${note.date}',
      ${note.checked}
    )`);
  },
  getAll : () => {
    return new Promise((resolve,reject) => {
      let list = [];
      db.each(`SELECT rowid AS id, * FROM ${TABLENAME}`,(err,row) => {
        if (err) reject(err);
        list.push(row);
      });
      resolve(list);
    });
  }
};