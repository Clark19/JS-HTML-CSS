/* Clark의 순수 자바스크립트 라이브러리 */

// 타입을 리턴 : '[object 타입]' 형태에서 '타입'만 리턴
/* typeof 연산자 문제점:
instanceof 연산자: 해당 객체가 어떤 생성자 함수로 생성됐는지 확인할 때 사용.
*/
if (!global.Jin) {
  global.Jin = {};
} // 네임스페이스를 충돌 방지용, 브라우져 자바스크립트 사용시 global을 => window로 바꿀 것.
Jin.trueType = function (obj) {
  let rtn = "";
  if (typeof obj === "object") {
    rtn = Object.prototype.toString.call(obj).split(" ")[1].replace("]", "");
  } else {
    rtn = typeof obj;
  }
  return rtn;
};

exports.Jin = Jin;
// exports = module.exports = Jin
