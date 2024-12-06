const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        todoItem.innerHTML =
            `<input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${todo.id})">
            <span>${todo.todo}</span>
            <button onclick="deleteTodo(${todo.id})">❌</button> `;

        todoList.appendChild(todoItem);
    });
}

const addTodo = () => {
    const todoText = todoInput.value.trim();

    if (todoText) {
        const newTodo = {
            id: Date.now(),
            todo: todoText,
            completed: false
        };
        todos.unshift(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = '';
    }else{
        alert('please enter task')
    }
}

const toggleComplete = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
}

const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

renderTodos();
