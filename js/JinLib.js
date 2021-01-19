/* Clark의 순수 자바스크립트 라이브러리 */

// 타입을 리턴 : '[object 타입]' 형태에서 '타입'만 리턴
if (!global.Jin) { global.Jin = {} } // 네임스페이스를 충돌 방지용, 브라우져 자바스크립트 사용시 global을 => window로 바꿀 것.
Jin.trueType = function(obj) {
  let rtn = ''
  if (typeof obj === 'object') {
    rtn = Object.prototype.toString.call(obj)
      .split(' ')[1].replace(']', '')
                
  } else {
    rtn = typeof obj
  }
  return rtn
}

exports.Jin = Jin
// exports = module.exports = Jin