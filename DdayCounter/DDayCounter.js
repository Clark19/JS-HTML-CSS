const TEXT_DDAY_GUIDE = "D-Day를 입력해 주세요.";
const TEXT_ERROR_INVALID_INPUT = "잘못된 입력입니다.";
const getElementById = (id) => document.getElementById(id);
const textDDay = getElementById("text_dday");
const textGuide = getElementById("text_guide");
const inputYear = getElementById("inputYear");
const inputMonth = getElementById("inputMonth");
const inputDay = getElementById("inputDay");
const btnDdayCount = document.querySelector("#btnStart");
const btnResetTimer = getElementById("btnResetTimer");

let timerId = 0;
let isTimerStarted = false;

let targetDate = localStorage.getItem("targetTime");
if (targetDate) {
  startDday(targetDate);
}

btnDdayCount.addEventListener("click", onclkDdayCountBtn);
function onclkDdayCountBtn() {
  let year = inputYear.value;
  let month = inputMonth.value;
  let day = inputDay.value;

  targetDate = new Date(`${year}-${month}-${day}`).setHours(0, 0, 0, 0);

  startDday(targetDate);
  saveDdayDataToLocal(targetDate);
}

// core : D-Day 핵심 로직 함수
function startDday(targetDate) {
  let currentDate = new Date();
  let ddayTimes = (targetDate - currentDate) / 1000;
  let secs = Math.floor(ddayTimes) % 60;
  let minutes = Math.floor(ddayTimes / 60) % 60;
  let hours = Math.floor(ddayTimes / 3600) % 24;
  let days = Math.floor(ddayTimes / 3600 / 24);

  if (!isTimerStarted) {
    console.log(days, hours, minutes, secs);
    textDDay.innerText = `${days}일 ${hours}시간 ${minutes}분 ${secs}초`;
    textDDay.style.visibility = "visible";

    timerId = setInterval(() => {
      isTimerStarted = true;
      currentDate = new Date();
      ddayTimes = (targetDate - currentDate) / 1000;
      secs = Math.floor(ddayTimes) % 60;
      minutes = Math.floor(ddayTimes / 60) % 60;
      hours = Math.floor(ddayTimes / 3600) % 24;
      days = Math.floor(ddayTimes / 3600 / 24);
      textDDay.innerText = `${days}일 ${hours}시간 ${minutes}분 ${secs}초`;
    }, 1000);

    inputYear.value = "";
    inputMonth.value = "";
    inputDay.value = "";

    btnDdayCount.setAttribute("disabled", "");
    btnResetTimer.removeAttribute("disabled", "");
  }
}

btnResetTimer.addEventListener("click", (e) => {
  clearInterval(timerId);
  textDDay.style.visibility = "hidden";
  btnResetTimer.setAttribute("disabled", "");
  localStorage.removeItem("targetTime");
  isTimerStarted = false;
});

inputYear.addEventListener("input", (e) =>
  e.target.value.length >= 4 ? inputMonth.focus() : 0
);
inputMonth.addEventListener("input", (e) => {
  if (e.target.value.length >= 2) {
    toggleStartBtn();

    inputDay.focus();
  }
});
inputDay.addEventListener("input", onInputDay);
function onInputDay(evt) {
  if (evt.target.value.length >= 2) {
    toggleStartBtn();
    btnDdayCount.focus();
  }
}

function toggleStartBtn() {
  if (
    inputYear.value.length === 4 &&
    2 >= inputMonth.value.length >= 1 &&
    2 >= inputDay.value.length >= 1
  ) {
    btnDdayCount.removeAttribute("disabled", "");
  } else {
    btnDdayCount.setAttribute("disabled", "");
  }
}

function saveDdayDataToLocal(targetTime) {
  localStorage.setItem("targetTime", targetTime);
}
