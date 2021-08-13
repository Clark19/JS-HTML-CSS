// select element
let nick = document.getElementById('nick');

// 입력란에 문자를 표시
nick.value = '별명을 입력하세요';

nick.onfocus = function () {
  this.style.background = "orange";
  this.value = '';
}

let el = document.querySelector('ul > li:nth-child(2)');
el.onclick = function () {
  alert('333');
}


// css vs js animation
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');

// CSS3 Animation(transiton)
box1.onclick = function () {
  this.style.marginLeft = '200px';
}

// jQuery Animtion
box2.onclick = function () {
  $(this).animate({
    marginLeft: '200px'
  }, 2000);
}


// 객관식 퀴즈 구현 예
let userAnswer = -1;
let nEls = document.querySelectorAll('ol > li');
for (let i = 0; i < nEls.length; i++) {
  nEls[i].onclick = function () {
    userAnswer = this.getAttribute('value');
    showQuiizResult(userAnswer);
  }
}

const ANSWER = '3'; // 정답 번호
function showQuiizResult(selectedAnswer) {
  let msg = '';
  switch (selectedAnswer) {
    case '1':
      msg = '틀렸음'
      break;
    case '2':
      msg = '틀렸음'
      break;
    case ANSWER:
      msg = '정답'
      break;
    case '4':
      msg = '틀렸음'
      break;
    default:
      break;
  }
  const output = document.querySelector("#quizResult");
  output.textContent = msg;
  output.style.textAlign = 'center';
  output.style.verticalAlign = 'middle';
  output.style.lineHeight = '150px';
}


// Callback function
function isODD(num) {
const output = document.querySelector("#quizResult");
if (num%2 == 0)
  output.innerText = '짝수'
else
  output.innerText = '홀수'
}
isODD(4);


// 배열과 객체
let cNames = ['n1','n2','n3']
cNames[3] ='n4'
console.log(cNames.toString())
// let cObs = {'o1', 2, [1,2], "33str"}
// console.log(cNames.toString())

// let searchName = prompt('이름 조회', '조회할 이름 입력하세요');
// for (let i=0; i<cNames.length; i++) {
//   if (searchName == cNames[i]) {
//     console.info(`${searchName} 을 찾았음`);ㅜ2
//     break;
//   } else if (i == cNames.length-1) {
//     console.warn('해당 이름 없음')
//   }
// }

//배열 역순 출력
let car = ['sonata', 'avante', 'matiz'];
console.log(car.reverse()); // 원본배열 변경
console.log(car)

// 객체 프로퍼티(속성) 추가
let person = {
  firstName: '길동',
  lastName: '홍',
}
person.country = 'Korea';
console.log(`${person.lastName}${person.firstName}의 고향은 ${person.country}`);



function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // 배열의 각 요소를
    partialSum += item; // partialSum에 더합니다.
    maxSum = Math.max(maxSum, partialSum); // 최대값을 기억해 놓습니다.
    if (partialSum < 0) partialSum = 0; // 음수가 되면 0을 대입합니다.
  }

  return maxSum;
}

// alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
// alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
// alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
// alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
// alert( getMaxSubSum([1, 2, 3]) ); // 6
// alert( getMaxSubSum([-1, -2, -3]) ); // 0
console.log( getMaxSubSum([2, -1, 2, 3, -9]) ); // 6



// 객체 실습
let book = {
  title: '채식주의자',
  author: '한강',
  price: 1200,
}
for (let key in book) {
  console.log(book[key]);
}

let books = [
  book,
  {
    title: '종의 기원',
    author: '정유정',
    price: 10000
  }
];

// 외곽 루프는 배열(for..of), 안쪽 루프는 객체(for..in)
for (let item of books) {
  for (let key in item) {
    console.info(item[key]);
  }
}