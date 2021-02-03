const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

let url = "http://127.0.0.1:3000/multiupload";
let isOverlap = false;
const PATH = "NodeJS/watch/";

let statWatcher = fs.watchFile(PATH, async (curStat, prevStat) => {
  let files = await fs.promises.readdir(PATH);
  await uploadFileP(files);
});

function uploadFileP(files) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    let data;
    let result;
    try {
      for (const fileName of files) {
        data = await fs.promises.readFile(PATH + fileName);
        formData.append("file", data, { filename: fileName });
      }

      // 다른 서버로 전송
      const result = await axios.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          "Content-Length": formData.getLengthSync(),
          apikey: "apikey",
          host: "hosts",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      console.log(`result status: ${result.status}`);
    } catch (err) {
      console.log("Error!!: " + err);
      reject(err);
    } finally {
      isOverlap = false;
    }
  });
}

// 멀티 요청 in axios 모듈
// 여러 요청을 동시 수행시 axios.all() 메서드 사용
// function getUserAccount() {
//   return axios.get('/user/12345');
// }

// function getUserPermissions() {
//   return axios.get('/user/12345/permissions');
// }

// axios.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // Both requests are now complete
//   }));

// form-data 로 요청 전송가능. 시도해 볼것
// https://www.npmjs.com/package/form-data

// nodeJs] 첨부 파일를 다른 서버로 전달하기
/*  - https://lahuman.github.io/axios_formdata_file_send/
API 서버에는 따로 첨부파일 정보를 저장하지 않고, buffer를 바로 내부 서버로 전달을 합니다.
이를 처리하는 방식으로는 2가지가 있습니다.
Proxy 사용
axios와 다른 라이브러리를 이용하여 post 통신
*/
