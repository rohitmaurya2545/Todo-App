const input_text = document.getElementById("input-text");
let add_btn = document.getElementById("add-btn");
const to_list = document.getElementById("todo_list");

let editTodo = null;
const addTodoList = (e) => {
  e.preventDefault();
  let textValue = input_text.value;
  if (textValue === "") {
    alert("Write something todo...");
    return false;
  }
  if (add_btn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = textValue;
    add_btn.value = "Add";
    input_text.value = "";
  } else {
    const createListItem = document.createElement("li");
    const listPara = document.createElement("p");
    listPara.innerHTML = textValue;
    createListItem.appendChild(listPara);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit", "btn");
    createListItem.appendChild(editBtn);

    const remove = document.createElement("button");
    remove.innerHTML = "Remove";
    remove.classList.add("remove", "btn");
    createListItem.appendChild(remove);

    to_list.appendChild(createListItem);
    input_text.value = "";

    saveLocalTodos(textValue);
  }
};
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    to_list.removeChild(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    input_text.value = e.target.previousElementSibling.innerText;

    input_text.focus();
    add_btn.value = "Edit";
    editTodo = e;
  }
};
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const createListItem = document.createElement("li");
      const listPara = document.createElement("p");
      listPara.innerHTML = todo;
      createListItem.appendChild(listPara);

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("edit", "btn");
      listPara.appendChild(editBtn);

      const remove = document.createElement("button");
      remove.innerHTML = "Remove";
      remove.classList.add("remove", "btn");
      createListItem.appendChild(remove);

      to_list.appendChild(createListItem);
    });
  }
};

const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
to_list.addEventListener("click", updateTodo);
add_btn.addEventListener("click", addTodoList);
