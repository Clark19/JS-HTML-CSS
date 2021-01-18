function log(msg) { console.log(msg) }
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