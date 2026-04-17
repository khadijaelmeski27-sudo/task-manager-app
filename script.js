let tasks = [];

// تحميل المهام من localStorage عند بداية الموقع
window.onload = function() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(task => createTaskElement(task.text, task.done));
  }
};

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function() {
  const input = document.getElementById("taskInput");
  const taskText = input.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    done: false
  };

  tasks.push(task);
  saveTasks();

  createTaskElement(task.text, task.done);

  input.value = "";
});

// function باش نصاوب task
function createTaskElement(text, done) {
  const li = document.createElement("li");
  li.textContent = text;

  if (done) {
    li.classList.add("done");
  }

  li.addEventListener("click", function() {
    li.classList.toggle("done");

    updateTask(text, li.classList.contains("done"));
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";

  deleteBtn.addEventListener("click", function() {
    li.remove();

    tasks = tasks.filter(task => task.text !== text);
    saveTasks();
  });

  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

// حفظ المهام
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// تحديث الحالة (done)
function updateTask(text, done) {
  tasks = tasks.map(task => {
    if (task.text === text) {
      return { text, done };
    }
    return task;
  });

  saveTasks();
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    document.getElementById("addBtn").click();
  }
});
}
