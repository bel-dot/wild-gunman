const tasks = [
    {
        text: "Push B",
        completed: false,
        added: new Date(2024, 1, 23),
        updated: new Date(2025, 1, 23),
    },
    {
        text: "Finish this lab.",
        completed: false,
        added: new Date(2024, 0, 23),
        updated: new Date(2025, 0, 23),
    },
];

function renderTasks(list) {
    taskList.innerHTML = '';

    for(const task of list) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-check';
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
        }
        taskDiv.appendChild(checkbox);
        
        const text = document.createElement('input');
        text.type = 'text';
        text.value = task.text;
        text.onchange = () => {
            task.updated = new Date();
        }
        taskDiv.appendChild(text);
        
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.onclick = () => {
            deleteTask(list, task.text);
        };
        deleteButton.innerText = 'Видалити';
        taskDiv.appendChild(deleteButton);
        
        taskList.appendChild(taskDiv);
    }
}

window.addEventListener('load', () => {
    renderTasks(tasks);
})

function deleteTask(list, text) {
    list.splice(list.findIndex(task => task.text == text), 1);
    renderTasks(list);
}

const taskList = document.getElementById('tasks-list');
const addForm = document.getElementById('add-form');
const addName = document.getElementById('add-name');

const sortByCompletionButton = document.getElementById('sort-by-completion');
const sortByDateAddedButton = document.getElementById('sort-by-date-added');
const sortByDateUpdatedButton = document.getElementById('sort-by-date-updated');

sortByCompletionButton.onclick = () => {
    renderTasks(tasks.sort((a, b) => a.completed - b.completed));
}

sortByDateAddedButton.onclick = () => {
    renderTasks(tasks.sort((a, b) => a.added - b.added));
}

sortByDateUpdatedButton.onclick = () => {
    renderTasks(tasks.sort((a, b) => a.updated - b.updated ));
}

addForm.onsubmit = (e) => {
    e.preventDefault();

    const task = {
        text: addName.value,
        completed: false,
        added: new Date(),
        updated: new Date(),
    };

    tasks.push(task);
    renderTasks(tasks);
}