// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn     = document.getElementById("addBtn");
const taskList   = document.getElementById("taskList");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task on button click
addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = ""; // clear input box
}

// Create task element
function createTaskElement(taskText) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="action-btns">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Mark completed on click
    li.addEventListener("click", (e) => {
        if (e.target.classList.contains("task-text")) {
            e.target.classList.toggle("completed");
        }
    });

    // Edit task
    li.querySelector(".edit-btn").addEventListener("click", () => {
        const newTask = prompt("Edit task:", li.firstElementChild.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            updateLocalStorage();
            li.firstElementChild.textContent = newTask;
        }
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

// Save to local storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load saved tasks
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

// Update local storage
function updateLocalStorage() {
    const taskTexts = [...taskList.querySelectorAll(".task-text")].map(t => t.textContent);
    localStorage.setItem("tasks", JSON.stringify(taskTexts));
}
