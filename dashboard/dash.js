const user = JSON.parse(localStorage.getItem("currentUser"));
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");


let date = Date.now();
let today = new Date(date).toISOString().slice(0, 10);
console.log(today)

let logout = () => {
  localStorage.removeItem("currentUser");
  location.href = "../index.html";
};

if (!user) {
  location.href = "/";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    add.removeAttribute("data-bs-dismiss");
  }
}

let data = JSON.parse(localStorage.getItem("data")) || [];
function acceptData() {
  const newTask = {
    userId: user.userId,
    text: textInput.value,
    date: today,
    description: textarea.value,
  };

  data.push(newTask);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
}

function createTasks() {
  tasks.innerHTML = "";
  const userTasks = data.filter((todoData) => todoData.userId === user.userId);

  userTasks.forEach((task, index) => {
    tasks.innerHTML += `
    <div id=${index}>
      <span class="fw-bold">${task.text}</span>
      <span class="small text-secondary">${task.date}</span>
      <p>${task.description}</p>
      <span class="options">
        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `;
  });

  resetForm();
}

function deleteTask(e) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Sure! The task has been deleted!", {
        icon: "success",
      });
      const taskId = e.parentElement.parentElement.id;
      e.parentElement.parentElement.remove();
      data.splice(taskId, 1);
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      swal("The task is safe!");
    }
  });
}

function editTask(e) {
  const selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  // dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
}

function resetForm() {
  textInput.value = "";
  textarea.value = "";
}

(() => {
  console.log(data);
  createTasks();
})();

const filteredTodo = data.filter((todoData) => todoData.userId === user.userId);
console.log(filteredTodo);
