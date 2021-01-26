const express = require("express");
const http = require("http");
const app = express();

const mysql = require("mysql");
let db = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "study",
  password: "study",
  database: "studydb",
});

// let sql = "select * from members";
// db.query(sql, (err, data) => {
//   if (err) console.log("err : " + err);
//   else {
//     console.log(data);
//     data.map((item) => {
//       console.log(`id: ${item.MNO}, ${item.MNAME}, ${item.EMAIL}`);
//     });
//   }
// });

app.get("/members", (req, res) => {
  const sql = "select * from members";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

http.createServer(app).listen(3000, () => {
  console.log("server on : 3000 port");
});
