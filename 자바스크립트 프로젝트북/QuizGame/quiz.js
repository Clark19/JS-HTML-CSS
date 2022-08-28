// 문제 객체
function Question(text, choice, answer) {
  this.text = text;
  this.choice = choice;
  this.answer = answer;
}

// 퀴즈 정보 객체
function Quiz(question) {
  this.score = 0;
  this.questions = question;
  this.questionIndex = 0;
}