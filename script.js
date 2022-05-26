const modal = document.querySelector('#todoForm');
const overlay = document.querySelector('#overlay');
const addButton = document.querySelector('#addBtn');
const addTodoForm = document.querySelector('#addTodoForm');
const todoInput = document.querySelector('#todoInput');
const todoColumn = document.querySelector('#noStatus');
const closeBtn = document.querySelector('.close-modal');
const columns = document.querySelectorAll('.status');
let draggables;

addButton.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
addTodoForm.addEventListener('submit', addTodo);
todoColumn.addEventListener('click', deleteTodo);

let draggedElement = null;

columns.forEach(function (column) {
  column.addEventListener('drop', onDrop);
  column.addEventListener('dragover', onDragOver);
});

function onDrop(event) {
  event.target.append(draggedElement);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragStart(event) {
  draggedElement = event.target;
}

function onDragEnd() {
  draggedElement = null;
}

function openModal() {
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function addTodo(event) {
  event.preventDefault();
  const newTodo = `
    <div class="todo" draggable="true">
        ${todoInput.value}
        <button class="close">&times;</button>
    </div>
  `;
  todoColumn.insertAdjacentHTML('beforeend', newTodo);
  todoInput.value = '';
  closeModal();

  draggables = document.querySelectorAll('.todo');
  draggables.forEach(function (draggable) {
    draggable.addEventListener('dragstart', onDragStart);
    draggable.addEventListener('dragend', onDragEnd);
  });
}

function deleteTodo(event) {
  if (event.target.matches('button.close')) {
    event.target.parentElement.remove();
  }
}
