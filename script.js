// load + display current task list
const loadList = async function(){
    document.querySelector('#taskBox').innerHTML = ''
    try {
        const taskArray = await getData()
        displayList(taskArray)
    } catch (error) {
        console.log(error)
    }
}

const displayList = (array) => {
    if (array === undefined) {
        const message = document.createElement('p')
        message.innerHTML = 'Woohooo all tasks completed'
        document.querySelector('#taskBox').appendChild(message) 
    } else {
        array.forEach(task => {
            const getTask = document.querySelector('#task').cloneNode(true)
            getTask.id = task.id
            if (task.done === 'true') {
                getTask.classList.add('task', 'done')
            } else {
                getTask.classList.add('task')
            }
            getTask.querySelector('p').innerHTML = task.description
            document.querySelector('#taskBox').appendChild(getTask)
        })
        clickDelete()
        clickEdit()
        clickCheck()
    }
}

// add new task
document.querySelector('#addTask').addEventListener('click', async function(){
    const input = document.querySelector('#input').value
    if (input === '') {
        console.log('input required')
    } else {
        try {
            const newTask = {}
            newTask.description = input
            newTask.done = 'false'
            await postData(newTask)
            await loadList()
            document.querySelector('#input').value = ''
        } catch (error) {
            console.log(error)
        }
    }
})

// mark task done
const clickCheck = () => {
    document.querySelectorAll('.checkIcon').forEach(icon => {
        icon.addEventListener('click', async function(event){
            const taskID = event.target.parentElement.parentElement.id
            const taskArray = await getData() 
            const updateTask = taskArray.find(task => {return task.id === taskID})
            if (updateTask.done === 'false') {
                updateTask.done = 'true'
            } else {
                updateTask.done = 'false'
            }
            console.log(updateTask)
            await editDone(updateTask, taskID)
            await loadList()
        })
    })
}

// edit task
const clickEdit = () => {
    document.querySelectorAll('.editIcon').forEach(icon => {
        icon.addEventListener('click',  function(event){
            document.querySelector('#popUp').style.display = 'block'
            const taskID = event.target.parentElement.parentElement.id
            popUpFunction(taskID)
        })
    })
}

// open edit pop-up
const popUpFunction = (taskID) => {
    document.querySelector('#editBtn').addEventListener('click', async function(){
        try {
            document.querySelector('#popUp').style.display = 'none'
            const taskArray = await getData() 
            const updateTask = taskArray.find(task => {return task.id === taskID})
            updateTask.description = document.querySelector('#newName').value
            await editTask(updateTask, taskID)
            await loadList()
        } catch (error) {
            console.log(error)
        } 
    })
}

// close edit pop-up
const closePopUp = () => {
    document.querySelector('#closeBtn').addEventListener('click', function(){
        document.querySelector('#popUp').style.display = 'none'
    })
}

// delete task
const clickDelete = () => {
    document.querySelectorAll('.deleteIcon').forEach(icon => {
        icon.addEventListener('click', async function(event){
            try {
                const taskID = event.target.parentElement.parentElement.id
                await deleteTask(taskID)
                await loadList()
            } catch (error) {
                console.log(error)
            } 
        })
    })
}

// delete all
document.querySelector('#clearBtn').addEventListener('click', async function(){
    try {
        await deleteAll()
        await loadList()
    } catch (error) {
        console.log(error)
    } 
})

// DEFAULT
loadList()
closePopUp()
