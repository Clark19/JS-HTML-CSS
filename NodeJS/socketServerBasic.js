const express = require("express");
const app = express();
const webSocket = require("./socketModuleBasic");
const port = process.env.SERVER_PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view 경로 설정
app.set("views", __dirname + "/public");

// 화면 engine을 ejs로 설정
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
  res.render("socketClient.html");
});

const server = app.listen(port, function() {
  console.log("Server is listening on " + port);
});

webSocket(server, app); // app을 넘겨줘서, socket.js에서 app 객체를 사용할 수 있습니다.
