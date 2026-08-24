const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const pendingCount = document.getElementById("pendingCount");

const addButton = document.getElementById("addButton");


let tasks = [];


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}


function toggleTask(id) {

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <li class="empty-message">
                Nenhuma tarefa cadastrada.
            </li>
        `;

    } else {

        tasks.forEach(task => {

            const li = document.createElement("li");

            li.className = "task";

            li.innerHTML = `

                <label class="task-content">

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                    >

                    <span class="${task.completed ? "completed" : ""}">
                        ${task.text}
                    </span>

                </label>

                <button class="delete">
                    Excluir
                </button>

            `;

            const checkbox = li.querySelector("input");

            checkbox.addEventListener("change", () => {

                toggleTask(task.id);

            });

            const deleteButton = li.querySelector(".delete");

            deleteButton.addEventListener("click", () => {

                deleteTask(task.id);

            });
            taskList.appendChild(li);
        });
    }
    updateCounters();
}

function updateCounters() {

    const total = tasks.length;

    const pending = tasks.filter(
        task => !task.completed
    ).length;


    taskCount.textContent =
        `${total} ${total === 1 ? "tarefa" : "tarefas"}`;


    pendingCount.textContent =
        `${pending} ${pending === 1 ? "pendente" : "pendentes"}`;
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});

renderTasks();