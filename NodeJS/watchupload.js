/* 갤럭시 노트20 용 Watch & Uploader
 - 감시대상 폴더: const PATH = "../../../DCIM/TimeStamp Camera/Site 1/"; ('Timestamp Camera'란 앱의 저장 폴더로 지정한 곳)
*/

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

// let url = "http://127.0.0.1:3000/multiupload";
// const PATH = "NodeJS/watch/";
// let url = "http://192.168.219.151:3000/multiupload";
// let url = "http://park9.mooo.com:3000/multiupload";
let url = "http://park9.duckdns.org:3000/multiupload";
const PATH = "../../../DCIM/TimeStamp Camera/Site 1/"; // ('Timestamp Camera'란 앱의 저장 폴더로 지정한 곳)

let statWatcher = fs.watchFile(PATH, (curStat, prevStat) => {
  let files = fs.readdirSync(PATH);
  uploadFileP(files);
});

function uploadFileP(files) {
  const formData = new FormData();
  let data;
  let result;
  try {
    for (const fileName of files) {
      data = fs.readFileSync(PATH + fileName);
      formData.append("file", data, { filename: fileName });
    }

    // 다른 서버로 전송
    axios
      .post(url, formData, {
        headers: _extends({}, formData.getHeaders(), {
          "Content-Length": formData.getLengthSync(),
        }),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then(function(res) {
        console.log(
          `result status: ${res.status} - if 204 is perhaps success.`
        );
      });
  } catch (err) {
    console.log("Error!!: " + err);
    reject(err);
  }
}
