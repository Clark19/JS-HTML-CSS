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

let userId = 1;
let sql = "select * from members where mno=?";
db.query(sql, [userId], (err, data) => {
  if (err) console.log("err : " + err);
  else {
    console.log(data);
    data.map((item) => {
      console.log(`id: ${item.MNO}, ${item.MNAME}, ${item.EMAIL}`);
    });
  }
});

app.get("/projects", (req, res) => {
  const sql = "select * from projects";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

// 1. callback 이용 방식
// app.get("/members", (req, res) => {
//   const mno = req.query.mno;
//   const sql = `select * from members where mno=?`;
//   db.query(sql, [mno], (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ message: `error 발생` });
//     }
//     res.json(data);
//   });
// });

function userFindById(mno) {
  return new Promise((resolve, reject) => {
    const sql = `select * from members where mno=?`;
    db.query(sql, [mno], (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

// Promise 이용 방식
// app.get("/members", (req, res) => {
//   const userId = req.query.mno;
//   userFindById(userId)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: `error 발생` });
//     });
// });

// async, await 이용 방식
app.get("/members", async (req, res) => {
  const userId = req.query.mno;
  try {
    let result = await userFindById(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `error 발생` });
  }
});

http.createServer(app).listen(3000, () => {
  console.log("server on : 3000 port");
});
