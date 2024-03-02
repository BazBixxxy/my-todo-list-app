import "./styles/general.css";
import "./styles/header.css";
import "./styles/sidebar.css";
import "./styles/form.css";
import "./styles/style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

class Todo {
  constructor(name, time, date, category) {
    this.name = name;
    this.time = time;
    this.date = date;
    this.category = category;
  }
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
  ); // in this case this is our new data that we are going to push to array to local storage

  // the method below we set our data to local storage
  if (localStorage.getItem("storage") == null) {
    localStorage.setItem("storage", "[]");
  }

  var data = JSON.parse(localStorage.getItem("storage"));
  data.push(newTodoItem);

  // here we save our work

  localStorage.setItem("storage", JSON.stringify(data));

  taskElement.value = "";
  timeElement.value = "";
  dateElement.value = "";
  workCategory.checked = false;
  homeCategory.checked = false;
  otherCategory.checked = false;

  renderTodoHTML();
}

function renderTodoHTML() {
  // if there's data in our local storage
  if (localStorage.getItem("storage") != null) {
    var storedArray = JSON.parse(localStorage.getItem("storage"));
    Array.from(storedArray);
  }
  let todoHTML = "";
  storedArray.forEach((todo) => {
    const html = `
        <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <input type="radio" id="completed" />
              <div class="todo-task">${todo.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${todo.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${todo.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${todo.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
    `;
    todoHTML += html;
  });
  document.querySelector(".projects").innerHTML = todoHTML;

  document.querySelectorAll(".delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      var newArray = [];
      const deletedItem = storedArray.splice(index, 1);
      storedArray.filter((item) => {
        if (item === deletedItem) return;
        else newArray.push(item);
      });
      console.log(newArray);
      localStorage.setItem("storage", JSON.stringify(newArray));
      renderTodoHTML();
    });
  });

  document.querySelectorAll("#completed").forEach((taskButton, index) => {
    taskButton.addEventListener("click", () => {
      if (localStorage.getItem("completed_tasks") == null) {
        localStorage.setItem("completed_tasks", "[]");
      }
      if (localStorage.getItem("incomplete_tasks") == null) {
        localStorage.setItem("incomplete_tasks", "[]");
      }
      var completedArray = JSON.parse(localStorage.getItem("completed_tasks"));
      var incompleteTaskArray = JSON.parse(
        localStorage.getItem("incomplete_tasks")
      );

      const deletedItem = storedArray.splice(index, 1);
      incompleteTaskArray = storedArray;
      console.log(incompleteTaskArray);
      localStorage.setItem("storage", JSON.stringify(incompleteTaskArray));
      renderTodoHTML();
      localStorage.setItem(
        "incomplete_tasks",
        JSON.stringify(incompleteTaskArray)
      );
      console.log(deletedItem);

      completedArray.push(deletedItem);
      localStorage.setItem("completed_tasks", JSON.stringify(completedArray));
      console.log(completedArray);
    });
  });
}

// renderTodoHTML();

function renderCompletedTasks() {
  if (localStorage.getItem("completed_tasks") != null) {
    var completedTaskArray = JSON.parse(
      localStorage.getItem("completed_tasks")
    );
    Array.from(completedTaskArray);
  }

  let completedTaskHTML = "";
  completedTaskArray.forEach((value) => {
    value.forEach((task) => {
      const html = `
              <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <div class="todo-task">${task.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${task.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${task.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${task.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
      `;
      completedTaskHTML += html;
    });
  });
  document.querySelector(".projects").innerHTML = completedTaskHTML;

  document.querySelectorAll(".delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      var newArray = [];
      const deletedItem = completedTaskArray.splice(index, 1);
      completedTaskArray.filter((item) => {
        if (item === deletedItem) return;
        else newArray.push(item);
      });
      console.log(newArray);
      localStorage.setItem("completed_tasks", JSON.stringify(newArray));
      renderCompletedTasks();
    });
  });
}

function renderIncompleteTasks() {
  if (localStorage.getItem("incomplete_tasks") != null) {
    var incompleteTaskArray = JSON.parse(
      localStorage.getItem("incomplete_tasks")
    );
    Array.from(incompleteTaskArray);
  }
  let incompleteTaskHTML = "";
  incompleteTaskArray.forEach((task) => {
    const html = `
                  <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <input type="radio" id="completed" />
              <div class="todo-task">${task.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${task.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${task.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${task.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
    `;
    incompleteTaskHTML += html;
  });
  document.querySelector(".projects").innerHTML = incompleteTaskHTML;

  document.querySelectorAll(".delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      var newArray = [];
      const deletedItem = incompleteTaskArray.splice(index, 1);
      incompleteTaskArray.filter((item) => {
        if (item === deletedItem) return;
        else newArray.push(item);
      });
      console.log(newArray);
      localStorage.setItem("incomplete_tasks", JSON.stringify(newArray));
      renderIncompleteTasks();
    });
  });
}

function renderHome() {
  if (localStorage.getItem("storage") != null) {
    var storedArray = JSON.parse(localStorage.getItem("storage"));
    Array.from(storedArray);
  }
  let homeHTML = "";
  storedArray.forEach((task) => {
    if (task.category === "home") {
      const html = `
        <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <input type="radio" id="completed" />
              <div class="todo-task">${task.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${task.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${task.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${task.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
      `;
      homeHTML += html;
    }
  });
  document.querySelector(".projects").innerHTML = homeHTML;

  document.querySelectorAll(".delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      var newArray = [];
      const deletedItem = storedArray.splice(index, 1);
      storedArray.filter((item) => {
        if (item === deletedItem) return;
        else newArray.push(item);
      });
      console.log(newArray);
      localStorage.setItem("storage", JSON.stringify(newArray));
      renderHome();
    });
  });

  document.querySelectorAll("#completed").forEach((taskButton, index) => {
    taskButton.addEventListener("click", () => {
      if (localStorage.getItem("completed_tasks") == null) {
        localStorage.setItem("completed_tasks", "[]");
      }
      if (localStorage.getItem("incomplete_tasks") == null) {
        localStorage.setItem("incomplete_tasks", "[]");
      }
      var completedArray = JSON.parse(localStorage.getItem("completed_tasks"));
      var incompleteTaskArray = JSON.parse(
        localStorage.getItem("incomplete_tasks")
      );

      const deletedItem = storedArray.splice(index, 1);
      incompleteTaskArray = storedArray;
      console.log(incompleteTaskArray);
      localStorage.setItem("storage", JSON.stringify(incompleteTaskArray));
      renderTodoHTML();
      localStorage.setItem(
        "incomplete_tasks",
        JSON.stringify(incompleteTaskArray)
      );
      console.log(deletedItem);

      completedArray.push(deletedItem);
      localStorage.setItem("completed_tasks", JSON.stringify(completedArray));
      console.log(completedArray);
    });
  });
}

document.querySelector(".side-home").addEventListener("click", () => {
  renderHome();
});

function renderWork() {
  if (localStorage.getItem("storage") != null) {
    var storedArray = JSON.parse(localStorage.getItem("storage"));
    Array.from(storedArray);
  }

  let workHTML = "";
  storedArray.forEach((task) => {
    if (task.category === "work") {
      const html = `
        <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <input type="radio" id="completed" />
              <div class="todo-task">${task.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${task.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${task.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${task.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
      `;
      workHTML += html;
    }
  });
  document.querySelector(".projects").innerHTML = workHTML;

  document.querySelectorAll(".delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      var newArray = [];
      const deletedItem = storedArray.splice(index, 1);
      storedArray.filter((item) => {
        if (item === deletedItem) return;
        else newArray.push(item);
      });
      console.log(newArray);
      localStorage.setItem("storage", JSON.stringify(newArray));
      renderWork();
    });
  });

  document.querySelectorAll("#completed").forEach((taskButton, index) => {
    taskButton.addEventListener("click", () => {
      if (localStorage.getItem("completed_tasks") == null) {
        localStorage.setItem("completed_tasks", "[]");
      }
      if (localStorage.getItem("incomplete_tasks") == null) {
        localStorage.setItem("incomplete_tasks", "[]");
      }
      var completedArray = JSON.parse(localStorage.getItem("completed_tasks"));
      var incompleteTaskArray = JSON.parse(
        localStorage.getItem("incomplete_tasks")
      );

      const deletedItem = storedArray.splice(index, 1);
      incompleteTaskArray = storedArray;
      console.log(incompleteTaskArray);
      localStorage.setItem("storage", JSON.stringify(incompleteTaskArray));
      renderWork();
      localStorage.setItem(
        "incomplete_tasks",
        JSON.stringify(incompleteTaskArray)
      );
      console.log(deletedItem);

      completedArray.push(deletedItem);
      localStorage.setItem("completed_tasks", JSON.stringify(completedArray));
      console.log(completedArray);
    });
  });
}

document.querySelector(".side-work").addEventListener("click", () => {
  renderWork();
});

function renderOther() {
  if (localStorage.getItem("storage") != null) {
    var storedArray = JSON.parse(localStorage.getItem("storage"));
    Array.from(storedArray);
  }

  let otherHTML = "";
  storedArray.forEach((task) => {
    if (task.category === "other") {
      const html = `
        <div class="project">
          <div class="top-line"></div>
          <div class="left">
            <div class="top">
              <input type="radio" id="completed" />
              <div class="todo-task">${task.name}</div>
            </div>
            <div class="bottom">
              <i class="fa-regular fa-clock"></i>
              <div class="time-display">${task.time}</div>
              <i class="fa-regular fa-calendar"></i>
              <div class="date-display">${task.date}</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <button class="delete">Delete</button>
            </div>
            <div class="bottom">
              <div class="category-display">${task.category}</div>
              <i class="fa-solid fa-hashtag"></i>
            </div>
          </div>
        </div>
      `;
      otherHTML += html;
    }
  });
  document.querySelector(".projects").innerHTML = otherHTML;

  document.querySelectorAll(".delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      var newArray = [];
      const deletedItem = storedArray.splice(index, 1);
      storedArray.filter((item) => {
        if (item === deletedItem) return;
        else newArray.push(item);
      });
      console.log(newArray);
      localStorage.setItem("storage", JSON.stringify(newArray));
      renderOther();
    });
  });

  document.querySelectorAll("#completed").forEach((taskButton, index) => {
    taskButton.addEventListener("click", () => {
      if (localStorage.getItem("completed_tasks") == null) {
        localStorage.setItem("completed_tasks", "[]");
      }
      if (localStorage.getItem("incomplete_tasks") == null) {
        localStorage.setItem("incomplete_tasks", "[]");
      }
      var completedArray = JSON.parse(localStorage.getItem("completed_tasks"));
      var incompleteTaskArray = JSON.parse(
        localStorage.getItem("incomplete_tasks")
      );

      const deletedItem = storedArray.splice(index, 1);
      incompleteTaskArray = storedArray;
      console.log(incompleteTaskArray);
      localStorage.setItem("storage", JSON.stringify(incompleteTaskArray));
      renderOther();
      localStorage.setItem(
        "incomplete_tasks",
        JSON.stringify(incompleteTaskArray)
      );
      console.log(deletedItem);

      completedArray.push(deletedItem);
      localStorage.setItem("completed_tasks", JSON.stringify(completedArray));
      console.log(completedArray);
    });
  });
}

document.querySelector(".side-other").addEventListener("click", () => {
  renderOther();
});

document.getElementById("addButton").addEventListener("click", addToList);

const projectArea = document.querySelector(".projects");
if (projectArea.innerHTML === "") {
  projectArea.innerHTML = `<h4>add something to your to-do list or check your completed tasks</h4>`;
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

document.querySelector(".completed-tasks").addEventListener("click", () => {
  renderCompletedTasks();
});

document.querySelector(".my-tasks").addEventListener("click", () => {
  if (JSON.parse(localStorage.getItem("storage")) == []) {
    document.querySelector(
      ".projects"
    ).innerHTML = `<h4>add something to your to-do list or check your completed tasks</h4>`;
  } else renderTodoHTML();
});

document.getElementById("addButton").addEventListener("click", () => {
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

// renderTodoHTML();

// window.onload = function () {
//   var reloading = sessionStorage.getItem("reloading");
//   if (reloading) {
//     sessionStorage.removeItem("reloading");
//     renderTodoHTML();
//   }
// };

// function reloadP() {
//   sessionStorage.setItem("reloading", "true");
//   document.location.reload();
// }

// if (localStorage.getItem("storage") != null) {
// }

renderTodoHTML();