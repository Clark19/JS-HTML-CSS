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
    cb(null, file.originalname);
  },
});

/* AWS S3같은 다른 서버로 파일을 넘겨줄때 이렇게 하면 디스크가 아닌
 메모리에 저장 후 다른 서버로 넘기므로. 디스크에서 삭제할 필요가 없다.
 buffer, fieldname, originalname을 다른 서버로 전송하면 됨. 메모리 부족 조심!
*/
// let storage = multer.memoryStorage();

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
