// ===== Task Manager App (Enhanced Version) =====

let tasks = []; let currentFilter = "all";

const taskInput = document.getElementById("taskInput"); const addBtn = document.getElementById("addBtn"); const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount"); const doneCount = document.getElementById("doneCount"); const pendingCount = document.getElementById("pendingCount"); const deleteAllBtn = document.getElementById("deleteAllBtn"); const filterButtons = document.querySelectorAll("[data-filter]");

// ===== Load ===== window.addEventListener("load", () => { const savedTasks = localStorage.getItem("tasks");

if (savedTasks) { tasks = JSON.parse(savedTasks); }

renderTasks(); });

// ===== Add ===== addBtn.addEventListener("click", addTask);

if (taskInput) { taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); }); }

function addTask() { const text = taskInput.value.trim(); if (!text) return;

const task = { id: Date.now(), text, done: false };

tasks.push(task); taskInput.value = "";

saveTasks(); renderTasks(); }

// ===== Render ===== function renderTasks() { taskList.innerHTML = "";

const filtered = tasks.filter(task => { if (currentFilter === "done") return task.done; if (currentFilter === "pending") return !task.done; return true; });

filtered.forEach(task => { const li = document.createElement("li"); li.textContent = task.text; li.className = task.done ? "done" : "";

li.addEventListener("click", () => {
  task.done = !task.done;
  saveTasks();
  renderTasks();
});

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "X";

deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  tasks = tasks.filter(t => t.id !== task.id);
  saveTasks();
  renderTasks();
});

li.appendChild(deleteBtn);
taskList.appendChild(li);

});

updateStats(); }

// ===== Stats ===== function updateStats() { const total = tasks.length; const done = tasks.filter(t => t.done).length; const pending = total - done;

if (totalCount) totalCount.textContent = total; if (doneCount) doneCount.textContent = done; if (pendingCount) pendingCount.textContent = pending; }

// ===== Save ===== function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); }

// ===== Delete All ===== if (deleteAllBtn) { deleteAllBtn.addEventListener("click", () => { tasks = []; saveTasks(); renderTasks(); }); }

// ===== Filters ===== filterButtons.forEach(btn => { btn.addEventListener("click", () => { currentFilter = btn.dataset.filter; renderTasks(); }); });
