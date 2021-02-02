const fs = require("fs");
const express = require("express");
const multer = require("multer");
let app = express();

const path = require("path");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, getFile(file));
  },
});

// 서버에 저장할 이름 생성. 지정 안하면 확장자 없는 랜덤 파일명으로 저장함.
function getFile(file) {
  let oriFile = file.originalname;
  let ext = path.extname(oriFile);
  let name = path.basename(oriFile, ext);
  // let rnd = Math.floor(Math.random() * 90) + 10; // 10 ~ 99
  // return Date.now() + "-" + rnd + "-" + name + ext;
  return name + ext;
}

let upload = multer({ storage: storage });

app.get("/multi", (req, res) => {
  fs.readFile("NodeJS/UploadMulti.html", "utf8", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

app.post("/multiupload", upload.array("file"), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log("server on http://localhost:3000 port");
});
