const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, {
    cors: {
      origins: "*:*",
      methods: ["GET", "POST"],
      // transports: ["websocket", "htmlfile", "xhr-polling", "jsonp-polling"],
    },
  });
  app.set("io", io); // express app 객체에 io를 저장해두고, 나중에 req.app.get('io)로 사용할 수 있습니다.

  // 특정 nmaespace에서만 통신할 수 있습니다. io.of() 안에 값에 원하는 namespace를 입력합니다.
  const namespace = io.of("/namespace");
  namespace.on("connection", (socket) => {
    socket.join("abc"); // join 메서드로 해당 이름 방에 참여할 수 있습니다.
    console.log(socket.adapter.rooms); // 방들을 조회할 수 있습니다.
    socket.to("abc").emit("join", socket.id); // 해당 방에 참여한 클라이언트에게만 emit 메서드를 사용합니다.
    socket.emit("join", socket.id);

    socket.interval = setInterval(() => {
      socket.emit("hi", "안녕, 나는 네임스페이스 서버야");
    }, 3000);

    socket.on("hihi", (data) => {
      console.log(data);
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
};
