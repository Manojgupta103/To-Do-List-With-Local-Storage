const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#add-btn");
const allTasks = document.querySelector("#all-tasks");
const emptyTaskMsg = document.querySelector("#empty-task-msg");

const taskList = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

addBtn.addEventListener("click",()=>{
    if(inputBox.value == ""){
        inputBox.classList.add("animate-shake");
        var r = setInterval(()=>{
            inputBox.classList.remove('animate-shake');
        },500);
    }
    else{
        taskList.push(inputBox.value);
        localStorage.setItem("tasks",JSON.stringify(taskList));
        location.reload();
    }
})

function displayTasks(){
    let task = "";
    for(let i=0; i<taskList.length; ++i){
        task += `<div class="w-full bg-black bg-opacity-70 rounded-lg overflow-hidden">
                        <div class="flex flex-col md:flex-row">
                            <textarea disabled rows="2" class="bg-white w-full resize-none p-4 outline-none font-prompt text-lg task-box">${taskList[i]}</textarea>
                            <div class="flex flex-row md:flex-col text-white font-medium edit-container">
                                <button class="flex items-center justify-center py-2 px-5 h-1/2 space-x-2 bg-[#97BC62] hover:scale-110 duration-200 w-1/2 md:w-auto done-btn">
                                    <span><i class="fa-solid fa-circle-check"></i></span>
                                    <h1>Done</h1>
                                </button>
                                <button class="flex items-center justify-center py-2 px-5 h-1/2 space-x-2 bg-[#2C5F2D] hover:scale-110 duration-200 w-1/2 md:w-auto edit-btn">
                                    <span><i class="fa-solid fa-pen-to-square"></i></span>
                                    <h1>Edit</h1>
                                </button>
                            </div>
                        </div>
                        <div class="flex text-white font-medium hidden save-container">
                            <button class="flex items-center justify-center py-2 px-5 h-1/2 space-x-2 bg-[#97BC62] hover:scale-110 duration-200 w-1/2 save-btn">
                                <span><i class="fa-solid fa-floppy-disk"></i></span>
                                <h1>Save</h1>
                            </button>
                            <button class="flex items-center justify-center py-2 px-5 h-1/2 space-x-2 bg-[#2C5F2D] hover:scale-110 duration-200 w-1/2 cancel-btn">
                                <span><i class="fa-solid fa-ban"></i></span>
                                <h1>Cancel</h1>
                            </button>
                        </div>
                    </div>`
    }
    allTasks.innerHTML = task;
    activateDone();
    activateEdit();
    activateSave();
    activateCancel();
}

function activateDone(){
    const doneBtn = document.querySelectorAll(".done-btn");
    doneBtn.forEach((btn,i)=>{
        btn.addEventListener("click",()=>{
            taskList.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(taskList));
            location.reload();
        })
    })
}

function activateEdit(){
    const editBtn = document.querySelectorAll(".edit-btn");
    const editContainer = document.querySelectorAll(".edit-container");
    const saveContainer = document.querySelectorAll(".save-container");
    const taskBox = document.querySelectorAll(".task-box");
    editBtn.forEach((btn,i)=>{
        btn.addEventListener("click",()=>{
            editContainer[i].classList.add("hidden");
            saveContainer[i].classList.remove("hidden");
            taskBox[i].disabled = false;
        })
    })
}

function activateSave(){
    const saveBtn = document.querySelectorAll(".save-btn");
    const taskBox = document.querySelectorAll(".task-box");
    saveBtn.forEach((btn,i)=>{
        btn.addEventListener("click",()=>{
            taskList[i] = taskBox[i].value;
            localStorage.setItem("tasks",JSON.stringify(taskList));
            location.reload();
        })
    })
}

function activateCancel(){
    const cancelBtn = document.querySelectorAll(".cancel-btn");
    const editContainer = document.querySelectorAll(".edit-container");
    const saveContainer = document.querySelectorAll(".save-container");
    const taskBox = document.querySelectorAll(".task-box");
    cancelBtn.forEach((btn,i)=>{
        btn.addEventListener("click",()=>{
            editContainer[i].classList.remove("hidden");
            saveContainer[i].classList.add("hidden");
            taskBox[i].disabled = true;
            taskBox[i].value = taskList[i];
        })
    })
}

function checkEmpty(){
    if(!taskList.length){
        allTasks.classList.add("hidden");
        emptyTaskMsg.classList.remove("hidden");
    }
    else{
        emptyTaskMsg.classList.add("hidden");
        allTasks.classList.remove("hidden");
    }
}

window.onload = function(){
    checkEmpty();
    displayTasks();
    checkEmpty();
}
