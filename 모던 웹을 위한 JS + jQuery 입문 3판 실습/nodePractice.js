const http = require('http');

const server = http.createServer((request, response) => {
  // 요청 정보 확인
  console.log(request.method);
  console.log(request.url);
  console.log();

  // 응답 방법
  if (request.url === '/hello') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.write('<meta charset="utf-8"/><h1>hello 안녕하세요</h1>');
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.write('<meta charset="utf-8"/><h1>hello Node!!!</h1>');
  }
  response.end();
});

server.listen(52273, () => {
  console.log('server Runnin at localhost:52273');
});
