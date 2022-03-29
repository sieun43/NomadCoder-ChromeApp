const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
//                toDoForm.querySelector("input")
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li"); //li생성
    li.id = newTodo.id;
    const span = document.createElement("span"); //span생성
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click", deleteToDo);
    
    //append는 마지막에
    li.appendChild(span);  //li 안에 span 넣기
    li.appendChild(button);  //li안에 button 넣기
    toDoList.appendChild(li); //id가 todo-list인 ul에 li 넣기
}


function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;  //input의 현재 value를 newTodo에 복사
    toDoInput.value = "";  
    
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}
//submit하면 입력창 빈칸으로
toDoForm.addEventListener("submit", handleToDoSubmit); 

const savedToDos = localStorage.getItem(TODOS_KEY);

//localStorage에 값이 존재한다면
if(savedToDos !== null) {
    // 가져온 string을 자바스크립트 object로
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}