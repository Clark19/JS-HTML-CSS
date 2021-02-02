const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

let url = "http://127.0.0.1:3000/singleupload";
let isOverlap = false;
const PATH = "NodeJS/watch/";

// let fsWatcher = fs.watch(PATH, async (eventType, filename) => {
//   if (isOverlap) return;
//   console.log("eventType is : " + eventType);
//   if (filename) console.log("filename:" + filename);
//   else console.log("no filename");

//   isOverlap = true;
//   let files = await fs.promises.readdir(PATH);
//   for (const file of files) {
//     await uploadFileP(file);
//   }
//   isOverlap = false;
//   console.log('must be false:' + isOverlap);
// });

// fsWatcher.on("error", (err) => {
//   if (!fs.existsSync(path)) console.log("folder deleted");
// });

let statWatcher = fs.watchFile(PATH, async (curStat, prevStat) => {
  // console.log(`the current mtime is: ${curStat.mtime}`);
  // console.log(`the previous mtime was: ${prevStat.mtime}`);
  let files = await fs.promises.readdir(PATH);
  for (const file of files) {
    await uploadFileP(file);
  }
});

function uploadFileP(filename) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await fs.promises.readFile(PATH + filename);
      // const data = await fs.createReadStream("NodeJS/watch/" + filename);
      // console.log(data); // 파일 데이터 읽기
      const formData = new FormData();
      formData.append("file", data, { filename: filename });

      let formLen = formData.getLengthSync();
      console.log("file length: " + formLen);
      // 다른 서버로 전송
      const result = await axios.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          "Content-Length": formLen,
          apikey: "apikey",
          host: "hosts",
        },
        // httpsAgent: new https.Agent({
        //   rejectUnauthorized: false,
        // }),
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

// function uploadFile(filename) {
//   fs.readFile(PATH + filename, async (err, data) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", data, { filename: filename });

//       let formLen = formData.getLengthSync();
//       console.log("length: " + formLen);
//       // 다른 서버로 전송
//       const result = await axios.post(url, formData, {
//         headers: {
//           ...formData.getHeaders(),
//           "Content-Length": formLen,
//           apikey: "apikey",
//           host: "hosts",
//         },
//         // httpsAgent: new https.Agent({
//         //   rejectUnauthorized: false,
//         // }),
//       });
//       console.log(result.data);
//     } catch (err) {
//       console.log("Error!!: " + err);
//     } finally {
//       isOverlap = false;
//     }
//   });
// }
