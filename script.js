document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const categorySelect = document.getElementById('categorySelect');

  function createTaskElement(taskText, category, name) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = name ? name + ': ' : '';
    nameSpan.style.fontWeight = 'bold';
    nameSpan.style.marginRight = '6px';
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'task-category ' + category;
    categoryBadge.textContent = category;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';

    checkbox.addEventListener('change', function () {
      li.classList.toggle('completed', checkbox.checked);
    });
    deleteBtn.addEventListener('click', function () {
      li.remove();
    });

    li.appendChild(checkbox);
    if (name) li.appendChild(nameSpan);
    li.appendChild(taskSpan);
    li.appendChild(categoryBadge);
    li.appendChild(deleteBtn);
    return li;
  }

  addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    let name = '';
    if (document.getElementById('nameInput')) {
      name = document.getElementById('nameInput').value.trim();
    }
    if (taskText) {
      const taskEl = createTaskElement(taskText, category, name);
      taskList.appendChild(taskEl);
      taskInput.value = '';
      if (document.getElementById('nameInput')) document.getElementById('nameInput').value = '';
      taskInput.focus();
    }
  });

  // Add name input field dynamically if not present
  if (!document.getElementById('nameInput')) {
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    nameInput.placeholder = 'Enter your name...';
    nameInput.style.flex = '1';
    const todoInputDiv = document.querySelector('.todo-input');
    todoInputDiv.insertBefore(nameInput, todoInputDiv.firstChild);
  }

  taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });
});
