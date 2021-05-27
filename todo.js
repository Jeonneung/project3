const toDoForm = document.querySelector(".js-toDoForm"),
    toDoinput = todoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(){// true를 리턴하는 함수
    return toDo.id === 1
}

const toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo){
        console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDOs();
}

function saveToDOs(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "x";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: toDos.length +1
    };
    toDos.push(toDoObj);
    saveToDOs();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        }
    }

function init(){
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit)
    }

    init();