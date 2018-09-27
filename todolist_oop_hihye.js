let todoList = [];

const Command = class {
    constructor(inputChr){
        this.inputTask = inputChr.toLowerCase().replace(/[\t\s]/g,'').split("$");
        this.fn = this.inputTask[0];
        this.task = this.inputTask[1];
        this.todoCount;
        this.doingCount;
        this.doneCount; 

        if(this.fn == "add") this.fn = add(this.task);
        else if(this.fn == "show") this.fn = show(this.task);
        else if(this.fn == "update") this.fn = update(this.task, this.inputTask[2]);
    }
}

function checkStatus(){
    todoList.forEach((v)=>{
        Command.todoCount = todoList.filter(v => v.status === "todo");
        Command.doingCount = todoList.filter(v => v.status === "doing");
        Command.doneCount = todoList.filter(v =>  v.status === "done");
    });

    let count = { todo: Command.todoCount, doing: Command.doingCount, done: Command.doneCount };
    return count;
}

function printStatus(){
    let count = checkStatus(todoList)
    console.log("현재상태 : " + "todo:" + count.todo.length + "개, doing:" + count.doing.length + "개, done:" + count.done.length + "개");
}

function add(task){
    let createDate = new Date();
    todoList.push({id: (todoList.length)+1, task: task, status: "todo", date: createDate});
    console.log("id: " + todoList[todoList.length-1].id + ", " + todoList[todoList.length-1].task + " 항목이 새로 추가됐습니다.");
    printStatus();
}

function show(task){
    let count = checkStatus(todoList);

    switch(task){
        case "todo":
            count.todo.forEach((v) => console.log("show: todo 상태인 id: " + v.id + ", " + v.task));
            break;
        case "doing":
            count.doing.forEach((v) => console.log("show: doing 상태인 id: " + v.id + ", " + v.task));
            break;
        case "done":
            count.done.forEach((v) => console.log("show: done 상태인 id: " + v.id + ", " + v.task));
            break;
    }
}

function update(updateId, newStatus){
    let doneDate;
    let dtDiff;

    todoList.forEach(function(v){ 
        if(v.id == updateId){
            if(newStatus == "done"){
                v.status = newStatus
                doneDate = new Date();
                console.log(v.status + "상태로 변경하였습니다.");
            } else {
                v.status = newStatus;
                console.log(v.status + "상태로 변경하였습니다.");
             }
        }
    });
}

const commandAdd = new Command("ADD$첫번째 todo");
const commandAdd2 = new Command("add$ 두번째 Todo");
const commandAdd3 = new Command("add $세번째 todo");

const commandShow = new Command("show $ todo");

const commandUpdate = new Command("update $ 3 $ done");
const commandUpdate2 = new Command("update $ 2 $ doing");

const commandShow2 = new Command("show $ done");