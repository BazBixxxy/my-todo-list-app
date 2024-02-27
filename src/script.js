const todoList = [];
console.log(todoList);


function Todo(name, time, date, category) {
  this.name = name;
  this.time = time;
  this.date = date;
  this.category = category;
}


function addToList() {
  const taskElement = document.getElementById("task");
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");
  const workCategory = document.getElementById("work");
  const homeCategory = document.getElementById("home");
  const otherCategory = document.getElementById("other");

  const taskInput = taskElement.value;
  const timeInput = timeElement.value;
  const dateInput = dateElement.value;
  const inputCategory = () => {
    let categoryInput;
    if (workCategory.checked) categoryInput = `work`;
    else if (homeCategory.checked) categoryInput = `home`;
    else categoryInput = `other`;
    return categoryInput;
  };

  const newTodoItem = new Todo(
    taskInput,
    timeInput,
    dateInput,
    inputCategory()
  );

  todoList.push(newTodoItem);
  localStorage.setItem("storage", JSON.stringify(todoList));

  // const todoList_serialized = JSON.stringify(todoList);
  // localStorage.setItem("stored_items", todoList_serialized);

  taskElement.value = "";
  timeElement.value = "";
  dateElement.value = "";
  workCategory.checked = false;
  homeCategory.checked = false;
  otherCategory.checked = false;

  renderTodoHTML();
}

function renderTodoHTML() {
  JSON.parse(localStorage.getItem("storage"));
  let todoHTML = "";
  todoList.forEach((item, index) => {
    const html = `
        <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <input type="radio" id="completed" onclick="
                todoList.splice(${index}, 1);
                renderTodoHTML();
              " />
              <div class="todo-task">${item.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${item.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${item.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete" onclick="
                todoList.splice(${index}, 1);
                renderTodoHTML();
              ">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${item.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
    `;
    todoHTML += html;
  });
  document.querySelector(".projects").innerHTML = todoHTML;
}

renderTodoHTML();

const projectArea = document.querySelector(".projects");

if (projectArea.innerHTML === "") {
  projectArea.innerHTML = `add an item to your list`;
}

document.querySelector(".add-item").addEventListener("click", () => {
  document.querySelector(".form").style = `
   display: block;
  `;
  document.querySelector(".main-content").style = `
  filter: blur(5px);
  `;
  document.querySelector("header").style = `
  filter: blur(5px);
  `;
  document.querySelector("aside").style = `
  filter: blur(5px);
  `;
  document.querySelector(".project-title").style = `
  filter: blur(5px);
  `;
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".form").style = `
  display: none;
  `;
  document.querySelector(".main-content").style = `
  filter: none;
  `;
  document.querySelector("header").style = `
  filter: none;
  `;
  document.querySelector("aside").style = `
  filter: none;
  `;
  document.querySelector(".project-title").style = `
  filter: none;
  `;
});

document.getElementById("addButton").addEventListener("click", () => {
  addToList();
});

// renderTodoHTML();
