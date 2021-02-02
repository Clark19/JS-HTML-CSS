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
