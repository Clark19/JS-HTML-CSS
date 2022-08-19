class App {
  #inputTodo = document.querySelector("#inputTodo");
  #btnAdd = document.getElementById("btnAdd");
  #todoList = document.getElementById("listTodo");

  constructor() {
    this.#btnAdd.onclick = this.#onClickBtnAdd.bind(this);
  }

  #onClickBtnAdd(e) {
    console.log(this.#inputTodo.value);

    const $newLi = document.createElement("li");
    $newLi.innerText = this.#inputTodo.value;
    this.#todoList.insertBefore($newLi, this.#todoList.childNodes[0]);

    this.#inputTodo.value = "";
    this.#inputTodo.focus();

    return false;
  }
}

new App();
