/* nuxt의 page/index.vue 파일과 소켓통신을 
하기위한 express socket.io 서버.
 */
const express = require("express");
let app = express();
// const cors = require("cors");
// app.use(cors());
const http = require("http");
let server = http.createServer(app);

const socket = require("socket.io");
let io = socket(server, {
  cors: {
    origins: "*:*",
    methods: ["GET", "POST"],
    // transports: ["websocket", "htmlfile", "xhr-polling", "jsonp-polling"],
  },
});

server.listen(3001, () => {
  console.log("server on 3001 Port");
});

let chat = io.of("/chat").on("connection", (socket) => {
  //  let chat = io.sockets.on("connection", (socket) => {
  socket.on("everyBodySend", (msg) => {
    // 클라이언트 이벤트 받기
    // io.emit("everyBodySend", msg) // 모든 소켓에 이벤트 전달
    socket.broadcast.emit("everyBodySend", msg); // 이벤트 발생시킨 클라이언트를 제외한 클라이언트 전부에게 이벤트 전달
    socket.emit("everyBodySend", msg); // 이벤트 발생 시킨 클라이언트에게만 이벤트 주기
  });
});
