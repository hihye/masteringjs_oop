let todoList = [];

const Command = class {
    constructor(inputChr){
        this.inputTask = inputChr.toLowerCase().replace(/[\t\s]/g,'').split("$");
        this.fn = this.inputTask[0];
        this.task = this.inputTask[1];
        this.todoCount;
        this.doingCount;
        this.doneCount; 
    }

    setFn(){
        if(this.fn == "add") this.fn = this.add(this.task);
        else if(this.fn == "show") this.fn = this.show(this.task);
        else if(this.fn == "update") this.fn = this.update(this.task, this.inputTask[2]); 
        else console.log("정상 입력이 아닙니다.");
    }

    checkStatus(){
        todoList.forEach((v)=>{
            this.todoTask = todoList.filter(v => v.status === "todo");
            this.doingTask = todoList.filter(v => v.status === "doing");
            this.doneTask = todoList.filter(v =>  v.status === "done");
        });
    
        let taskStatusArr = { todo: this.todoTask, doing: this.doingTask, done: this.doneTask };
        return taskStatusArr;
    }
    
    printStatus(){
        let taskStatus = this.checkStatus(todoList)
        console.log("현재상태 : " + "todo:" + taskStatus.todo.length + "개, doing:" 
            + taskStatus.doing.length + "개, done:" + taskStatus.done.length + "개");
    }
    
    add(task){
        try {
            let createDate;
            todoList.push({id: (todoList.length)+1, task: task, status: "todo", date: createDate = new Date()});
        
            console.log("id: " + todoList[todoList.length-1].id + ", " + todoList[todoList.length-1].task + " 항목이 새로 추가됐습니다.");
            this.printStatus();} catch(err){
                console.log("정상 입력이 아닙니다.");
            }
    }

    show(task){
        let taskStatus = this.checkStatus(todoList);
    
        switch(task){
            case "todo":
                taskStatus.todo.forEach((v) => console.log("show: todo 상태인 id: " + v.id + ", " + v.task));
                break;
            case "doing":
                taskStatus.doing.forEach((v) => console.log("show: doing 상태인 id: " + v.id + ", " + v.task));
                break;
            case "done":
                taskStatus.done.forEach((v) => console.log("show: done 상태인 id: " + v.id + ", " + v.task));
                break;
        }
    }

    dueDate(updateTask, doneDate){
        let rest = doneDate.getTime() - updateTask.date.getTime();
        let sec = Math.floor(rest / 1000 % 60);
        let min = Math.floor(rest / 1000 / 60) % 60;
        let hours = Math.floor(rest / 1000 / 60 / 60) % 24;
        let days = Math.floor(rest / 1000 / 60 / 60 / 24)-30; // day 차이가 있을 경우 한 달 차이가 나는데 아직 이렇게 밖에 계산을... ㅠㅠ
    
        console.log("ID " + updateTask.id + "을 " + updateTask.status + "상태로 변경하였습니다. 소요시간은 " + 
            days + "일 " + hours + ":" + min + ":" + sec + " 입니다.");
    }
    
    update(updateId, newStatus){
        let doneDate;
        let updateTask=[];

        todoList.forEach((v) => updateTask = todoList.filter(v => v.id == updateId));

        if(newStatus == "done"){
            updateTask[0].status = newStatus;
            doneDate = new Date(2018,10,30,23,59,59); // 임의로 완료시간 세팅함
            this.dueDate(updateTask[0],doneDate);
            } else {
            updateTask[0].status = newStatus;
            console.log("ID " + updateTask[0].id + "을 " + updateTask[0].status + "상태로 변경하였습니다.");
        }
    }
}

const commandAdd = new Command("ADD$첫번째 todo");
const commandAdd2 = new Command("add$ 두번째 Todo");
const commandAdd3 = new Command("add $세번째 todo");
commandAdd.setFn();
commandAdd2.setFn();
commandAdd3.setFn();

const commandAddErr = new Command("err ");
commandAddErr.setFn();

const commandShow = new Command("show $ todo");
commandShow.setFn();

const commandUpdate = new Command("update $ 3 $ done");
commandUpdate.setFn();
const commandUpdate2 = new Command("update $ 2 $ doing");
commandUpdate2.setFn();

const commandShow2 = new Command("show $ done");
commandShow2.setFn();