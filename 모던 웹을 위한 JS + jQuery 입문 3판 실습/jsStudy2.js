/*
객체, 함수 부터 연습
*/

/* 익명함수와 화살표 함수에서의 this 차이
 - 익명 함수: 함수 자체에 바인딩(window/prototype 객체가 될 수도 있음)
 - Arrow Function: 전역 객체(웹 브라우저 환경에선 window 객체)
*/

/* Arrow Function 사용시 전제 조건:
1. prototype 사용대신, ES6의 클래스 사용할것
2. jQuery의 문서 객체 조작에서 this 키워드가 아니라, event.currentTarget을 사용할 것.
    event.target과 this(=event.currentTarget)는 다음과 같은 차이점이 있습니다.
    event.target은 실제 이벤트가 시작된 ‘타깃’ 요소입니다. 버블링이 진행되어도 변하지 않습니다.
this는 ‘현재’ 요소로, 현재 실행 중인 핸들러가 할당된 요소를 참조합니다.
this(event.currentTarget) – <form> 요소에 있는 핸들러가 동작했기 때문에 <form> 요소를 가리킵니다.
event.target – 폼 안쪽에 실제 클릭한 요소를 가리킵니다.
https://ko.javascript.info/bubbling-and-capturing

// Babel 같은 Transfiler 이용시 주의점: 
 1. 화살표 함수를 단순히 익명함수로 변경하므로 this 사용시 버그 가능성
 2. let 을 var로 단순히 변경하므로 위의(클로저 부분) var와 비동기 함수 이용시 발생 할 수 있는 버그 발생 가능함.

*/

/* 함수를 정의 하면 자동으로 arguments, prototype 이란 객체가 만들어진다.
(생성자)함수를 만들고 this.속성명 사용했는데
생성자 함수 호출시 new 키워드 사용안하면 this 가 window객체를 의미하는게 되어 함수가 이상하게 작동 할 수 있음.
new를 사용해야 this 가  함수만을 위한 공간을 의미하게 됨.
*/
/*
자바스크립트의 모든 기본 내장 객체는 Object 객체의 상속을 받음.
자바스크립트는 프로토타입 기반 객체지향 언어다.
ES6의 클래스 문법으로 작성하면 생성자 함수로 구현한 것과 같게 내부적으로 변환.
따라서 클래스 기반 객체지향 언어가 가지고 있는 모든 특성을 구현하지 못함.
*/

// false로 변환되는 것들 : 암기!
Boolean(0);
Boolean("");
Boolean(null);
Boolean(undefined);
Boolean(NaN);

// 옵션 객체 초기화 (디폴트 매개변수 비스무리)
function test4(options) {
  // 옵션 객체를 초기화합니다.
  options.valueA = options.valueA || 10;
  options.valueB = options.valueB || 20;
  options.valueC = options.valueC || 30;
  // 출력합니다.
  console.log(options.valueA + ":" + options.valueB + ":" + options.valueC);
}
// 함수를 호출합니다.
test4({
  valueA: 52,
  valueC: 273,
});

// 캡슐화 : 속성을 올바르게 사용하도록 보호하는 기법
function Rectangle(w, h) {
  // 변수를 선언합니다.
  var width = w;
  var height = h;
  // 메서드를 선언합니다.
  this.getWidth = function () {
    return width;
  };
  this.getHeight = function () {
    return height;
  };
  this.setWidth = function (w) {
    if (w < 0) {
      throw "길이는 음수일 수 없습니다.";
    } else {
      width = w;
    }
  };
  this.setHeight = function (h) {
    if (w < 0) {
      throw "길이는 음수일 수 없습니다.";
    } else {
      height = h;
    }
  };
}
Rectangle.prototype.getArea = function () {
  return this.getWidth() * this.getHeight();
};

// 상속
function Square(length) {
  this.base = Rectangle; // base란 이름 사용안해도 됨.
  this.base(length, length);
}
Square.prototype = Rectangle.prototype;
Square.prototype.constructor = Square;

let s = new Square(5);
console.log(s instanceof Rectangle);

const { Jin } = require("../js/JinLib");
console.log(Jin.trueType(s));

// ES6 Class 문법 연습

/* 자바스크립트 참고 대표 레퍼런스
*모질라 MDN
 - Array(배열) https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
 - 여기 부터 읽을 차례: => https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array#%EB%A7%A4%EC%B9%98_%EA%B2%B0%EA%B3%BC%EB%A5%BC_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EB%B0%B0%EC%97%B4_%EC%83%9D%EC%84%B1
*모던 JavaScript 튜토리얼 - https://ko.javascript.info/
 - 이벤트 위임 읽을 차례 : https://ko.javascript.info/event-delegation
*DevDocs.io - https://devdocs.io/
*JavaScript Standard Style - https://github.com/standard/standard/blob/master/docs/README-kokr.md
 - 그외 구글/AirBnb JS 코드 스타일 가이드 있음. - https://ko.javascript.info/coding-style

 https://ko.javascript.info/class
 */
