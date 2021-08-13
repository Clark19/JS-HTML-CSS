let date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // year-month 채우기
  document.querySelector(
    ".year-month"
  ).textContent = `${viewYear}년 ${viewMonth + 1}월`;

  // 지난 달 마지막 Date, 이번 달 마지막 Date
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // Dates 기본 배열들
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // prevDates 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  // nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // Dates 합치기
  const dates = prevDates.concat(thisDates, nextDates);

  // Dates 정리
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";

    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  });

  // Dates 그리기
  document.querySelector(".dates").innerHTML = dates.join("");

  // 오늘 날짜 그리기
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".dates > .date")) {
      // if (date.children[0].innerText == today.getDate()) {
      if (+date.innerText == today.getDate()) {
        date.childNodes[0].classList.add("today");
        break;
      }
    }
  }
};

renderCalendar();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};

function trueType(obj) {
  let rtn = "";
  if (typeof obj === "object") {
    rtn = Object.prototype.toString
      .call(obj)
      .split(" ")[1]
      .replace("]", "");
  } else {
    rtn = typeof obj;
  }
  return rtn;
}

function updateMySportRecord() {
  const today = new Date();
  const dates = document.querySelectorAll(".dates > .date");
  for (let date of dates) {
    if (date.children[0].innerText == today.getDate()) {
      console.log("날짜:", +date.innerText);
      console.log(trueType(+date.innerText));
      console.log(trueType(date.children[0].innerText));

      let recordKind = "운동";
      addRecord(date, recordKind);
      addRecord(date, "코딩");

      break;
    }
  }
}

function addRecord(date, recordKind) {
  const ele = document.createElement("div");
  // 텍스트를 -> 라인으로 바꿀 것. 페이지 갱신되도 유지되게 할것
  // ele.classList.add("recordGoal");

  let bgColorClass;
  switch (recordKind) {
    case "운동":
      bgColorClass = "sport";
      break;
    case "코딩":
      bgColorClass = "coding";
      break;

    default:
      break;
  }
  ele.classList.add("recordGoal", bgColorClass);

  const textNode = document.createTextNode(recordKind);
  ele.appendChild(textNode);
  date.appendChild(ele);
}
