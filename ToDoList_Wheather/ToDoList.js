class App {
  #inputTodo = document.querySelector("#inputTodo");
  #btnAdd = document.getElementById("btnAdd");
  #todoList = document.getElementById("listTodo");
  #btnDelAll = document.getElementById("btnDelAll");

  constructor() {
    this.#btnAdd.onclick = this.#onClickBtnAdd.bind(this);
    this.#btnDelAll.onclick = this.#onDeleteAll.bind(this);
  }

  #onClickBtnAdd(e) {
    if (!this.#inputTodo.value || !this.#inputTodo.value.trim()) {
      this.#inputTodo.value = "";
      this.#inputTodo.focus();
      return false;
    }

    const $newLi = document.createElement("li");
    $newLi.appendChild(this.#createCheckBtn());
    $newLi.appendChild(this.#createEditTextBtn());
    $newLi.appendChild(this.#createEditBtn());
    $newLi.appendChild(this.#createDelBtn());
    $newLi.setAttribute("id", `item-${new Date().getTime()}`);

    this.#todoList.insertBefore($newLi, this.#todoList.childNodes[0]);

    this.#inputTodo.value = "";
    this.#inputTodo.focus();

    return false;
  }

  #createCheckBtn() {
    const checkBtn = document.createElement("span");
    checkBtn.classList.add("check");
    // checkBtn.innerText = "🔳🔲⬜⬛☑✔✅";
    // checkBtn.innerHTML = "&#x2705;"; // '&check;'
    checkBtn.innerText = "⬜";
    checkBtn.checked = false;
    checkBtn.onclick = (e) => {
      // this.parentNode.classList.toggle("checked");
      e.currentTarget.parentNode.childNodes[1].classList.toggle("checked");
      if (!e.currentTarget.checked) {
        checkBtn.innerText = "✅";
        checkBtn.checked = true;
      } else {
        checkBtn.innerText = "⬜";
        checkBtn.checked = false;
      }
    };
    return checkBtn;
  }
  #createEditTextBtn() {
    const inputText = document.createElement("input");
    inputText.value = this.#inputTodo.value;
    inputText.readOnly = true;
    inputText.disabled = true;

    return inputText;
  }
  #createEditBtn() {
    const btnEdit = document.createElement("button");
    btnEdit.appendChild(document.createTextNode("✏")); // \u270F
    btnEdit.classList.add("btn");
    btnEdit.isReadOnlyMode = true;
    btnEdit.onclick = function (e) {
      if (e.currentTarget.isReadOnlyMode) {
        this.parentNode.childNodes[1].disabled = false;
        this.parentNode.childNodes[1].readOnly = false;
        this.parentNode.childNodes[1].select();
        this.parentNode.childNodes[2].replaceChild(
          document.createTextNode("✔"), // \u2714
          this.parentNode.childNodes[2].firstChild
        );
        e.currentTarget.isReadOnlyMode = false;
      } else {
        // EDIT_POSSIBLE_MODE
        this.parentNode.childNodes[1].disabled = true;
        this.parentNode.childNodes[1].readOnly = true;
        this.parentNode.childNodes[2].replaceChild(
          document.createTextNode("✏"), // \u270F
          this.parentNode.childNodes[2].firstChild
        );
        e.currentTarget.isReadOnlyMode = true;
      }
    };

    return btnEdit;
  }
  #createDelBtn() {
    const btnDel = document.createElement("button");
    btnDel.innerText = "❌"; // \u274c
    const clsAttr = document.createAttribute("class");
    clsAttr.value = "btn";
    btnDel.setAttributeNode(clsAttr);
    btnDel.addEventListener("click", (e) =>
      e.currentTarget.parentNode.parentNode.removeChild(
        e.currentTarget.parentNode
      )
    );

    return btnDel;
  }

  #onDeleteAll(e) {
    let $todoItem = this.#todoList.lastElementChild;
    while ($todoItem) {
      this.#todoList.removeChild($todoItem);
      $todoItem = this.#todoList.lastElementChild;
    }
  }
}

new App();

weatherProcess();

async function weatherProcess() {
  const $regionName = document.getElementsByClassName("region_name")[0];

  const geoLocation = await new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
  console.log("current GeoPosition:", geoLocation.coords);

  const currentWeather = await getWeather(geoLocation.coords);
  const savedWeather = JSON.parse(localStorage.getItem("weather"));
  if (JSON.stringify(currentWeather) !== JSON.stringify(savedWeather)) {
    localStorage.setItem("weather", JSON.stringify(currentWeather));
  }
  setWeatherDisplay(currentWeather);

  async function getWeather({ latitude, longitude }) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=37f358946c1e066e30de9e425d80b2c0`
      );
      const weatherData = await response.json();

      researchWeatherData(weatherData);
    } catch (error) {
      console.log("날씨 정보 획득 실패");
    }

    function researchWeatherData(data) {
      // 날씨 데이터 객체 정보
      const sys = data.sys;
      const city = data.name;
      const weather = data.weather;
      const main = data.main;

      const wmain = weather[0].main;
      const w_id = weather[0].id;
      const icon = weather[0].icon;
      const country = sys.country;
      const temp = main.temp;
      const temp_min = main.temp_min;
      const temp_max = main.temp_max;

      console.log(data.weather);
      console.log(data.main);
      console.log(wmain);

      const $weatherInfo = document.getElementById("weather_info");

      // 날씨 아이콘
      const iconUrl = "http://openweathermap.org/img/w/" + icon;
      const $imgIcon = document.createElement("img");
      $imgIcon.setAttribute("src", iconUrl + ".png");

      // 날씨 정보
      document.querySelector(".w_id").innerText = wmain;
      document.querySelector(".temp").innerHTML =
        parseInt(temp - 273.15) + "&deg;";
      document.querySelector(".temp_min").innerHTML =
        parseInt(temp_min - 273.15) + "&deg;" + " min";
      document.querySelector(".temp_max").innerHTML =
        parseInt(temp_max - 273.15) + "&deg;" + " max";

      document.querySelector(".contents").style = "visibility: hidden;";
      $weatherInfo.style = "visibility: visible;";
    }

    return {
      regionName: weatherData.name,
      weather: weatherData.weather[0].main,
    };
  }

  function setWeatherDisplay({ regionName, weather }) {
    const weatherMainList = [
      "Clear",
      "Clouds",
      "Drizzle",
      "Fog",
      "Rain",
      "Thunderstorm",
    ];
    weather = weatherMainList.includes(weather) ? weather : "Fog";
    $regionName.textContent = regionName;
    document.body.style.backgroundImage = `url("./img/${weather}.jpg")`;
  }
}
