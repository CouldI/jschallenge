//jshint esversion:6

const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS = 'toDos';
let toDos = [];

deleteToDo = (event) => {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(toDo => {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
};


saveToDos = () => {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
};

paintToDo = (text) => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
};

handleSubmit = () => {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
};


loadToDo = () => {
    const loadedtToDos = localStorage.getItem(TODO_LS);
    if (loadedtToDos !== null) {
        const parsedTodos = JSON.parse(loadedtToDos);
        parsedTodos.forEach(toDo => paintToDo(toDo.text));
    }
};


function init() {
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();