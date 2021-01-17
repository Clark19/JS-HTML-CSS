// 한글 테스트
function log(msg) { console.log(msg) }
// console.log('%d, %s, %j', 1, '2', {a: 1})
// log(`파일네임: ${__filename}`)
// log(`폴더명: ${__dirname}`)

// const fs = require('fs')
log('a')

// setTimeout(()=>{
//   log('b')
// },0)

// fs.readFile('nodeJSStudy.js', 'utf8', (err, result)=>{
//   log('b')
//   if (err) throw err;
//   // log(result)
// })

// fs.writeFile('a.txt', 'hoㅋㅋho 감사', (err)=>{
//   if (err) {
//     log(err);
//     return;
//   }
//   log('file write finished.')
// })

let s = 0
for (let i = 0; i < 10000; i++) {
  s += i
}
log('c')
// log('\n')
