let tasks = [];
let editingTaskId = null;

const taskInput = document.querySelector('#task-input');
const category = document.querySelector('#category');
const taskDate = document.querySelector('#task-date');

const addTaskBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');

addTaskBtn.addEventListener('click' , () => {
  const taskText = taskInput.value.trim()
  if (taskText === '') {
    alert('Please enter a task')
    return;
  }
  if (editingTaskId === null) {
    //add new task
    const newTask =  {
      id: Date.now(),
      title: taskText,
      category: category.value ,
      dueDate: taskDate.value,
      completed: false
    }

    tasks.push(newTask)
  } else {
    // update existing task

    const selectedTask = tasks.find(task => task.id === editingTaskId);

    if (selectedTask) {
      selectedTask.title = taskText;
      selectedTask.category = category.value;
      selectedTask.dueDate = taskDate.value;
    }

    editingTaskId = null;
    addTaskBtn.textContent = '+ Add Task';
  
  }
  
  saveToLocalStorage()
  renderTask()


  taskInput.value = '';
  category.value = '';
  taskDate.value = '';
})
  
  function renderTask (taskArray = tasks) {
      const taskHTML = taskArray.map(task => {
        return `
        <li class="task-card ${task.completed ? 'completed' : ''} ">
        ${task.title} <br>
        ${task.category}
        ${task.dueDate}
        <div class="cardBtn">
        <input type="checkbox" data-id= "${task.id}" ${task.completed ? 'checked' : ''}>
        <button id="EditBtn" class="edit-Btn" data-id ="${task.id}" >
        Edit
        </button>
        <button id="DeleteBtn" class="delete-Btn" data-id ="${task.id}" >
        Delete
        </button>
        </div>
        </li>
        `;
      })
      taskList.innerHTML = taskHTML.join('');
    }
    function saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    
    if(savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

    taskList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const taskId = e.target.dataset.id;
        const selectedTask = tasks.find(task => task.id === Number(taskId));

        if (selectedTask) {
        selectedTask.completed = !selectedTask.completed;

        saveToLocalStorage()
        renderTask()
        
        }
      }
    })

    taskList.addEventListener('click' , (e) =>{
      const deleteTask = e.target.classList.contains('delete-Btn');

      if (deleteTask) {
        const taskId = e.target.dataset.id;
        tasks = tasks.filter(task => task.id !== Number(taskId));

        saveToLocalStorage()
        renderTask()
      }
    })
    
    taskList.addEventListener('click' , (e) => {
      const editTask = e.target.classList.contains('edit-Btn')
      const taskId = e.target.dataset.id;

      const selectedTask = tasks.find(task => task.id === Number(taskId))

      if(editTask && selectedTask) {
        editingTaskId = selectedTask.id;


        taskInput.value = selectedTask.title;
        category.value = selectedTask.category;
        taskDate.value =selectedTask.dueDate;
        addTaskBtn.textContent = 'Update Task';
      }
    })

const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase()

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchText)
  )

  renderTask(filteredTasks)
})

const filterButtons = document.querySelectorAll('input[name="filter"]'
)

filterButtons.forEach(button => {
  button.addEventListener('change', () => {
    const filterValue = button.value;
    
    let filteredTask = tasks;

    if(filterValue === 'active') {
      filteredTask = tasks.filter(task => !task.completed);
    } else if (filterValue === 'completed') {
      filteredTask = tasks.filter(task => task.completed)
    }

    renderTask(filteredTask);
  })
})

// ADD THESE TWO LINES HERE
loadFromLocalStorage();
renderTask();
