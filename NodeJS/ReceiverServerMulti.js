const fs = require("fs");
const express = require("express");
const multer = require("multer");
let app = express();

const path = require("path");
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
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
  fs.readFile("UploadMulti.html", "utf8", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

/* 사진이 서버에 올라오면 목표트래커에 운동한거 표시하기 
→ html dom (캘린더/이미지) element 생성/삽입/표시 하기. 
웹서버에서 사진 접근하기. 체크하기. 사진 html에 삽입하기 
또는 사진 던져주는 api 만들기.
*/
app.post("/multiupload", upload.array("file"), (req, res) => {
  console.log(req.body);
  if (req.files.length) {
    console.log(req.files);
    console.log(`file path: ${req.files[0].path}`);
    // console.log(`file path: ${req.files["file"].path}`);
    makeHtml(upload.fields);
    res.status(204).end();
  } else {
    res.status(200).end();
  }
});

app.listen(3000, () => {
  console.log("server on http://localhost:3000 port");
});

function makeHtml() {
  console.log("haveTo make HTML and Display");
  /*
  html 만들어서 사용자 요청시 보내주거나
  아니면 socket.io로 사진 바로 부분적으로 
  보내주거나 기존 html에서 ajax로 알아서 가져가게 하기
  */
}
