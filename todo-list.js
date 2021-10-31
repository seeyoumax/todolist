let todoList = [];

function addTodoitem (task) {
    const todoItem = {
        task:task,
        done:false,
        id:Date.now()
    };

    todoList.push(todoItem);
    refreshTodoList(todoItem);
    saveLocalStorage();

}

function refreshTodoList(todoItem){
    const ul = document.querySelector("#todo-list");
    const oldItem = document.querySelector(`[data-id="${todoItem.id}"]`);

    if (todoItem.deleted) {
        oldItem.remove();
        return;

    }

    const li = document.createElement("li");
    const isDone = todoItem.done ? "done" :""; 
    li.setAttribute("data-id",todoItem.id);
    li.setAttribute("class",`todo-item ${isDone}`);
    li.innerHTML = ` <label for = "${todoItem.id}"class="tick"></label>
    <input type = "checkbox" id = "${todoItem.id}">
    <span >${todoItem.task}</span>
    <button class = "delete"><img src="images/del.jpg"></button>`;

    if (oldItem) {
        ul.replaceChild(li,oldItem);
    } else {
        //ul.append(li);
        ul.insertBefore(li,ul.firstElementChild);
    }

    
}

/*用戶點選完成待辦
 () => {}
 只有一行代碼 可省左右括號
*/
function toggleDone (id){
    /*const index = todoList.findIndex(function(todoItem){
        return todoItem.id === Number(id);
    });    */
    const index = todoList.findIndex(todoItem => todoItem.id === Number(id));

   

    todoList[index].done = !todoList[index].done;
    refreshTodoList(todoList[index]);
    saveLocalStorage();
}

//刪除待辦
function deleteTodoItem (id){
    const index = todoList.findIndex(todoItem =>todoItem.id ===Number(id));
    todoList[index].deleted = true;
    refreshTodoList(todoList[index]);
    todoList = todoList.filter(todoItem =>todoItem.id !==Number(id));
    saveLocalStorage();

}

//保存資料
//localStorage.setItem 需是字串
function saveLocalStorage(){
    localStorage.setItem("todo-list",JSON.stringify(todoList));

}


const form = document.querySelector("#todo-form");

form.addEventListener("submit",event => {
    event.preventDefault();
    //console.log("submit test1");
    const input = document.querySelector ("#todo-input");
    const task = input.value.trim();
    //console.log(task);
    if (task !== "") {
        addTodoitem(task);
        input.value = "";
        //console.log(todoList);
    } else {
        alert("輸入空白");
    }
   
    }
);

//捉用戶點選位置
const ul = document.querySelector("#todo-list");
ul.addEventListener("click",event =>{
    console.log(event.target);
    const id = event.target.parentElement.dataset.id;
    if(event.target.classList.contains("tick"))
    {
        
        //console.log(`id is ${id}`);
        toggleDone(id);

    }else if (event.target.classList.contains("delete"))
     {
        console.log(`delete id = ${id}`);
        deleteTodoItem(id);
        console.log(todoList);

     }


});

//讀取LocalStorage
document.addEventListener("DOMContentLoaded",() =>{
    const todoListString = localStorage.getItem("todo-list");

    if(todoListString){
        todoList = JSON.parse(todoListString);

        for(let i = 0; i < todoList.length;i++){
            refreshTodoList(todoList[i]);

        }

    }



});
