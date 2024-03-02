# my-todo-list-app

A simple app to manage and store your daily tasks [to-do(s)]

Improvements:

> use date-fns to automatically delete an item when its times up

> add effects to when an item has been deleted

> add local storage to the application

Issues:

> the renderTodoHTML function returns undefined on the first run in any browser making the app unfunctional

Using local storage to store items of my to-do app

> first we won't need the to-do list array

> the items are going to be stored in the local storage with a key name of storage and the value of an array

> after creating an item, we check whether the storage key exists in our local storage and then we create one using with an array value:

if (localStorage.getItem("storage")==null){
localStorage.setItem("storage", "[]")
}

> we then call the storage key in our local storage and pass it to array to store our todos:

var todoList = JSON.parse(localStorage.getItem("storage"))

> now we have an array [todoList], we then push our new task/todo to this array:

todoList.push(newTodo)

> we then set the todoList to our storage key in our localStorage:

localStorage.setItem("storage", JSON.stringfy(todoList))

Removing an item from our storage:

> we create a new variable to store our array containing our todos

> we then create another array empty array in which we shall push our items after being deleted

> we then store our deleted items in a variable which we shall use to filter our todo array

> we use the filter method to loop through the todo array and remove the deleted item:

      const newArray = [];
      const deletedItem = storedArray.splice(index, 1);
      storedArray.filter((item) => {
        if (item === deletedItem) return;
        else {
          newArray.push(item);
        }
      });
      localStorage.setItem("storage", JSON.stringify(newArray));
      renderTodoHTML();

> we then set localStorage array to the new array, and call the renderTodoHTML function inside the click event
