let todos = [];
const defaultTodos = [
    {
        title:'Todo 1',
        completed:true,
    },
    {
        title:'Todo 2',
        completed:false,
    }
];

const initTodo = function(){
    todos = JSON.parse(localStorage.getItem('todos')) || defaultTodos || []
}
initTodo();

const generateTodo = function(todo, index){
    // const li = document.createElement('li');
    const div = document.createElement('div');
    div.classList.add('bd-callout','bd-callout-warning')
    // div.textContent = todo.title;

    const checkBoxItem = document.createElement('input')
    checkBoxItem.type='checkbox'
    checkBoxItem.checked=todo.completed
    checkBoxItem.classList.add('form-check-input')
    checkBoxItem.onchange = function(){
        setComplete(index, !todo.completed)
    }

    const todoLabel = document.createElement('label')
    todoLabel.classList.add('form-check-label')
    if(todo.completed) todoLabel.classList.add('text-strike')
    todoLabel.textContent = todo.title

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('btn', 'btn-xs', 'btn-danger', 'pull-right')
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>'
    removeBtn.onclick = function(){
        deleteItem(index)
    }

    div.appendChild(checkBoxItem)
    div.appendChild(todoLabel)
    div.appendChild(removeBtn)
    return div;
}

const renderTodos = function () {
    document.querySelector('#todoList').innerHTML='';
    todos.forEach(function(todo, index){
        document.querySelector('#todoList')
        .appendChild(generateTodo(todo, index));
    })
    document.querySelector('#countTotal').textContent=todos.length||0;
    document.querySelector('#countRemaining').textContent=todos.filter(todo=>!todo.completed).length
    document.querySelector('#countDone').textContent=todos.filter(todo=>todo.completed).length
}
renderTodos();

const todoForm = document.getElementById('todoForm')

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    todos.push({
        title:e.target.elements.inputTodo.value,
        completed:false,
    })
    renderTodos();
    e.target.elements.inputTodo.value='';
})

const setComplete = function(index, value){
    todos[index].completed = value
    saveTodoToStorage()
    renderTodos()
}

const deleteItem = function(index){
    todos.splice(index,1)
    saveTodoToStorage()
    renderTodos()
}

document.querySelector('#button-reset').addEventListener('click', function(e){
    e.preventDefault()
    todos = []
    saveTodoToStorage()
    renderTodos()
})

const saveTodoToStorage = function(){
    localStorage.setItem('todos', JSON.stringify(todos))
}
