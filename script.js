// State Management
let tasks = JSON.parse(localStorage.getItem('dashboard_tasks')) || [];

// DOM Elements
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addBtn = document.getElementById('add-btn');
const searchBar = document.getElementById('search-bar');
const themeBtn = document.getElementById('theme-toggle');

const saveAndRender = () => {
    localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
    render(searchBar.value);
};

const render = (query = '') => {
    taskList.innerHTML = '';
    
    const filteredTasks = tasks
        .filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => b.priority - a.priority || a.completed - b.completed);

    if (filteredTasks.length === 0) {
        document.getElementById('empty-state').style.display = 'block';
    } else {
        document.getElementById('empty-state').style.display = 'none';
        filteredTasks.forEach((task) => {
            const index = tasks.findIndex(t => t.id === task.id);
            
            // Generate Date and Time Strings
            const dateObj = new Date(task.id);
            const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            const timeStr = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

            const li = document.createElement('li');
            li.className = `task-item p-${task.priority}`;
            
            li.innerHTML = `
                <div class="task-info ${task.completed ? 'done' : ''}">
                    <span style="font-weight:600">${task.name}</span>
                    <small class="timestamp">📅 ${dateStr} at ${timeStr}</small>
                </div>
                <div class="actions">
                    <button class="btn-done" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                    <button class="btn-del" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    updateStats();
};

const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percentage = total === 0 ? 0 : (completed / total) * 100;

    document.getElementById('total-count').textContent = total;
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
};

// Global Handlers
window.toggleTask = (i) => { tasks[i].completed = !tasks[i].completed; saveAndRender(); };
window.deleteTask = (i) => { tasks.splice(i, 1); saveAndRender(); };

// Event Listeners
addBtn.addEventListener('click', () => {
    tasks.push({
        id: Date.now(), // Acts as unique ID and creation timestamp
        name: taskInput.value.trim(),
        priority: parseInt(prioritySelect.value),
        completed: false
    });
    taskInput.value = '';
    addBtn.disabled = true;
    saveAndRender();
});

taskInput.addEventListener('input', () => addBtn.disabled = !taskInput.value.trim());
searchBar.addEventListener('input', (e) => render(e.target.value));

themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? '🌙' : '☀️';
});

// Initial Init
render();