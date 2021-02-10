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
    makeHtml(res);
    // res.status(204).end();
  } else {
    res.status(200).end();
  }
});

const server = app.listen(3000, () => {
  console.log("server on http://localhost:3000 port");
});

// socket.io 관련 부분
// Socket.io
const socket = require("socket.io");
let io = socket(server, {
  cors: {
    origins: "*:*",
    methods: ["GET", "POST"],
    // transports: ["websocket", "htmlfile", "xhr-polling", "jsonp-polling"],
  },
});
app.set("io", io); // express app 객체에 io를 저장해두고, 나중에 req.app.get('io')로 사용할 수 있음.

app.get("/", (req, res) => {
  fs.readFile("public/socketClient.html", "utf8", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

function makeHtml(req) {
  console.log("haveTo make HTML and Display");
  /*
  socket.io로 사진 바로 부분적으로 보내주거나 
  기존 html에서 ajax로 알아서 가져가게 하기
  */
  // 아래 부분을 소켓io emit이나 브로드 캐스트하면 될듯
  let msg = "Refresh";
  const chat = io.of("/chatChannel").emit("join", msg); // 모든 소켓에 이벤트 전달
  // io.emit("everyBodySend", msg); // 모든 소켓에 이벤트 전달
  // cSocket.broadcast.emit("everyBodySend", msg); // 이벤트 발생시킨 클라이언트를 제외한 클라이언트 전부에게 이벤트 전달
  // cSocket.emit("everyBodySend", msg); // 이벤트 발생 시킨 클라이언트에게만 이벤트 주기
  // fs.readFile("public/loginPage.html", "utf8", (err, data) => {
  //   res.writeHead(200, { "Content-Type": "text/html" });
  //   res.end(data);
  // });
}

//    //let chat = io.of("/chat").on("connection", (socket) => {
// let chat = io.sockets.on("connection", (socket) => {
//   console.log("서버 socket connection 안");
//   socket.on("everyBodySend", (msg) => {
//     // 클라이언트 이벤트 받기
//     // io.emit("everyBodySend", msg) // 모든 소켓에 이벤트 전달
//     console.log("서버 socket.on 안");
//     socket.broadcast.emit("everyBodySend", msg); // 이벤트 발생시킨 클라이언트를 제외한 클라이언트 전부에게 이벤트 전달
//     socket.emit("everyBodySend", msg); // 이벤트 발생 시킨 클라이언트에게만 이벤트 주기
//   });
// });

// 특정 nmaespace에서만 통신할 수 있습니다. io.of() 안에 값에 원하는 namespace를 입력합니다.
const chat = io.of("/chatChannel");
chat.on("connection", (socket) => {
  // socket.join("room1"); // join 메서드로 해당 이름 방에 참여할 수 있습니다.
  // console.log(socket.adapter.rooms); // 방들을 조회할 수 있습니다.
  // socket.to("room1").emit("join", socket.id); // 해당 방에 참여한 클라이언트에게만 emit 메서드를 사용합니다.
  socket.emit("join", `너의 id: ${socket.id}`);

  socket.on("join", (data) => {
    console.log("여긴 서버: " + data);
  });

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 해제");
    socket.leave("abc"); // leave 메서드로 해당 이름 방에서 제외할 수 있습니다.
    clearInterval(socket.interval);
  });
  socket.on("error", (error) => {
    console.error(error);
  });
});
