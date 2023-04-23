const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
const createNewTaskElement = function (taskString) {

  const label = document.createElement("label");
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  editButton.innerText = "Edit";

  label.className = "task label";
  checkBox.className = "checkbox input";
  listItem.className = "todo-list__item";
  editInput.className = "text-input_all text-input task input";
  editButton.className = "edit btn";
  deleteButton.className = "delete btn";
  deleteButtonImg.className = "delete__img";

  checkBox.type = "checkbox";
  editInput.type = "text";

  deleteButtonImg.src = "./remove.svg";


  deleteButtonImg.setAttribute("alt", "remove");

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;

};


const addTask = function () {

  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";

};

//Edit an existing task.
const editTask = function () {

  const listItem = this.parentNode;
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const editInput = listItem.querySelector("input[type=text]");
  const containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");

};

//Delete task.
const deleteTask = function () {

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);

};

//Mark task completed
const taskCompleted = function () {

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

};


const taskIncomplete = function () {

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

};

const ajaxRequest = function () {
};
//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
//select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;

};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);

}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {

  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);

}
