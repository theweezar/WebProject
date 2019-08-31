var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)"); // Lệnh này là chạy đúng lệnh sqlite 1 lần

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)"); // khởi tạo để chạy vòng lặp nhập dữ liệu
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize(); // kết thúc vòng lặp nhập
  // db.run("INSERT INTO lorem VALUES ('Duc')");
  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //   console.log(row.id + ": " + row.info);
  // });
  db.each("SELECT rowid as id, * FROM lorem",(err, row) => { // .each dành cho phần lấy dữ liệu. Dùng run ko chạy dc
    console.log(row.id);
  });
});

db.close();