const j = require('../js/JinLib')

function log(msg) { 
  // console.log(`msg type: ${j.Jin.trueType(msg)}`)
  console.log(msg) }

function logA(array) { 
  let output = '['
  for (let value of array) {
    output += value +', '
  }
  output += ']'
  console.log(output)
  // console.log(msg)
}

let person = {
  name: '윤인성',
  eat: food => console.log(this.name + `이 ${food}먹는다`)
  , k: 92, m: 30, e:96, s:100
}

person.eat('빵')

let o =''
with(person) {
  o += name+'\n'
  o += k+'\n'
  o += m+'\n'
  o += e+'\n'
  o += s+'\n'
}
console.log(o)

person.감자 = 11
log(person.감자)
delete person.감자
log(person.감자)
console.log(person)


console.log(j.Jin.trueType(/ab/))

/////////////////////////
// 배열 메서드 테스트
let a = [0,1,2,3,4,]
let b = [20,21,22,23,24]

// 배열 병합
// es6 ...(전개 연산자) 사용, immutable
let s1 = [...a, ...b]
logA(s1); log('\n')

// .concat() 이용, immutable - 자기 자신을 변경하지 않고, 새로운 배열 리턴.
s2 = a.concat(b)
logA(s2); log('\n')

// .splice()와 ...(전개 연산자) 동시 이용, , mutable - 자기 자신을 변경 시킴.
a.splice(a.length, 0, ...b)
// !주의: a.splice(a.length, 0, b) 이렇게 사용하면 a[a.length]에 b배열이 원소 각각이 풀려서 들어가는게 아니라 배열 자체가 하나의 요소로 들어감.
logA(a)
log(a[5]); log('\n')


// 배열 삭제 => .splice() 이용
// delete a[2] 하면 배열 공간이 삭제되는게 아니라 배열 a에서 2번째 공간은 그대로인채 a[2]가 undefined만 될 뿐이다.
logA(a)
a.splice(2,1)
logA(a); log('\n')