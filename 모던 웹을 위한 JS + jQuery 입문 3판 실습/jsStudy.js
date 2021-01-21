const j = require("../js/JinLib");

function log(msg) {
  // console.log(`msg type: ${j.Jin.trueType(msg)}`)
  console.log(msg);
}

function logA(array) {
  let output = "[";
  for (let value of array) {
    output += value + ", ";
  }
  output += "]";
  console.log(output);
  // console.log(msg)
}

let person = {
  name: "윤인성",
  eat: (food) => console.log(this.name + `이 ${food}먹는다`),
  k: 92,
  m: 30,
  e: 96,
  s: 100,
};

person.eat("빵");

let o = "";
with (person) {
  o += name + "\n";
  o += k + "\n";
  o += m + "\n";
  o += e + "\n";
  o += s + "\n";
}
console.log(o);

person.감자 = 11;
log(person.감자);
delete person.감자;
log(person.감자);
console.log(person);

console.log(j.Jin.trueType(/ab/));

/////////////////////////
// 배열 메서드 테스트
let a = [0, 1, 2, 3, 4];
let b = [20, 21, 22, 23, 24];

// 배열 병합
// es6 ...(전개 연산자) 사용, immutable
let s1 = [...a, ...b];
logA(s1);
log("\n");

// .concat() 이용, immutable - 자기 자신을 변경하지 않고, 새로운 배열 리턴. - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
s2 = a.concat(b);
logA(s2);
log("\n");

// .splice()와 ...(전개 연산자) 동시 이용, , mutable - 자기 자신을 변경 시킴. - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
a.splice(a.length, 0, ...b);
// !주의: a.splice(a.length, 0, b) 이렇게 사용하면 a[a.length]에 b배열이 원소 각각이 풀려서 들어가는게 아니라 배열 자체가 하나의 요소로 들어감.
logA(a);
log(a[5]);
log("\n");

// 배열 삭제 => .splice() 이용
// delete a[2] 하면 배열 공간/객체가 삭제되는게 아니라 배열 a[2] 공간은 그대로인채 undefined만 되고,
// 원래 있던 객체도 그대로 있다.
let temp = a[2];
delete a[2];
console.log(temp);
logA(a);

a[2] = 2; // 배열 복구
logA(a);
//정상적인 삭제 시작
a.splice(2, 1);
logA(a);
log("삭제 끝\n");

// 배열 복사하기 : .slice() 이용
let fruits = ["사과", "바나나"];
let shallowCopy = fruits.slice(); // 사본을 만드는 방법
// ["딸기", "망고"]
shallowCopy[1] = "ㄱㄱ";
logA(fruits);

// ...(전개 연산자) 이용한 객체 복제
o = { name: "name1", bDay: new Date(2016, 12 - 1, 9).toString() };
let o2 = { ...o };
console.log(`obj1: ${o.name}, ${o.bDay}`);
console.log(`obj2: ${o2.name}, ${o2.bDay}`);

// ES6 함수 가변 매개변수: 선언시 전개 연산자 사용. ...전개 연산자 이용한 매개변수는 배열 임.
// es5, es6 둘다 arguments(배열 유사 객체) 내장 객체 사용해 가변 매개변수 이용해도 됨.
function test(a, b, ...numbers) {
  console.log(numbers); // 3,4,5,6만 출력
}
function test2(a, b, c, d) {
  console.log(a, b, c, d);
}
log("가변 매개 변수 테스트");
test(1, 2, 3, 4, 5, 6);
a = [0, 1, 2, 3];
test2.apply(null, a); // es5 스타일. apply 첫인자는 내부에서 활용할 this 키워드 객체임. null 넣는듯하나 문제가 되는 경우도 있다고 함..
test2(...a);

//생성자 함수 연습
function Student(name, korean) {
  this.name = name;
  this.korean = korean;
}
Student.prototype.toString = function () {
  return this.name + ", " + this.korean;
};

// 함수 실습
f(); // 선언적 함수의 실행 순서
function f() {
  log(1);
}
function f() {
  log(2);
}

function sumAll() {
  log(typeof arguments + " : " + arguments.length);
}
sumAll(1, 2, 3);

// 자기 호출 함수: 내부 함수와 비슷 - 함수 이름 충돌 문제 해결위해 사용?
// - ! 자기 호출 함수 전에 이전 문장에 ;(semicolon)없으면 에러 남.
(function () {
  console.log(2 ** 5);
})();

// callback 함수
function c1(cb) {
  for (let i = 0; i < 3; i++) cb();
}
c1(() => log("c"));

// 함수를 리턴하는 함수: Closure 때문에 사용하는 경우가 많은 듯.
function returnF() {
  return function () {
    console.log("Hello Function");
  };
}
returnF()();

/* 클로저(Closure)의 정의는 다양: 1. 지역 변수를 남겨두는 현상을 클로져라고 부름
  2.함수 내부의 변수들이 살아있는 함수내 공간을 클로저라고 부름. 3.리턴 함수 자체를 클로저라 함.
  4.살아 남은 지역 변수를 클로저라고 함. => 정의가 다양해서 클로저가 어떤 것인지 감만 잡길.
  클로저 함수로 인해 남은 지역 변수는 클로저 함수 각각의 고유 변수.
*/
function closureFunction(name) {
  var output = "Hello " + name + "..!";
  return function () {
    console.log(output);
  };
}
let f1 = closureFunction("JavaScript 클로저 펑션1");
let f2 = closureFunction("JS Closure 펑션2");
f1();
f2();

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
// 위 함수의 문제점을(3만 3번 찍힘) 자기 호출 함수와 클로저 이용해 수정. ES6에선 var 를 let으로 바꾸기만 하면 수정됨
for (var i = 0; i < 3; i++) {
  (function (closedI) {
    setTimeout(function () {
      console.log(closedI);
    }, 0);
  })(i);
}
// .forEach 이용해도 해결 가능
[0, 1, 2].forEach(function (i) {
  setTimeout(function () {
    console.log(i);
  }, 0);
});
