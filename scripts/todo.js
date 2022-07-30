"use strict";

class Task {
  task;
  owner;
  isDone;
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

//Get userArr from Storage
let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

//Get logined user from storage
const loginedUser = getFromStorage("loginedUser");
let activeUser = "";
const activeUserId = userArr.findIndex((user) => user.username === loginedUser);
activeUserId !== -1 && (activeUser = userArr[activeUserId]);

//Get todo Arr from storage
let todoArr = getFromStorage("todoArr");
!todoArr && (todoArr = []);

const btnAdd = document.getElementById("btn-add");
const taskInput = document.getElementById("input-task");
const todoListContainer = document.getElementById("todo-list");

const handleTodoList = function (e) {
  if (e.target.tagName === "SPAN") {
    //Delete
    const clicked = e.target.closest("li");
    //Remove from todoArr
    const id = clicked.dataset.taskId;
    todoArr.splice(id, 1);
    updateToStorage("todoArr", todoArr);
    renderTodoList();
    return;
  }
  //Toggle
  const id = e.target.dataset.taskId;
  todoArr[id].isDone = !todoArr[id].isDone;
  updateToStorage("todoArr", todoArr);
  renderTodoList();
};

const renderTodoList = function () {
  todoListContainer.removeEventListener("click", handleTodoList);

  todoListContainer.innerHTML = "";

  todoArr.forEach((row, id) => {
    if (row.owner === loginedUser) {
      const html = `<li ${
        row.isDone ? `class="checked"` : ``
      } data-task-id=${id}>${row.task}<span class="close">×</span></li>`;
      todoListContainer.insertAdjacentHTML("beforeend", html);
    }
  });

  todoListContainer.addEventListener("click", handleTodoList);
};

btnAdd.addEventListener("click", function () {
  if (taskInput.value === "") {
    alert("Task title cannot be empty!");
    return;
  }

  todoArr.push(new Task(taskInput.value, loginedUser, false));
  renderTodoList();
  updateToStorage("todoArr", todoArr);
});

if (activeUserId !== -1) {
  const activeUser = userArr[activeUserId];
  renderTodoList(activeUser);
}
