// FUNCTION: load current task list
const loadList = async () => {
    document.querySelector('#taskBox').innerHTML = ''
    try {
        // fetch updated task list
        const taskArray = await getData()
        displayList(taskArray)
    } catch (error) {
        console.log(error)
    }
}

// FUNCTION: display current task list
const displayList = (array) => {
    if (array === undefined) {
        const message = document.createElement('p')
        message.innerHTML = 'wohooo all tasks completed'
        document.querySelector('#taskBox').appendChild(message) 
    } else {
        // create new element for each task
        array.forEach(task => {
            const getTask = document.querySelector('#task').cloneNode(true)
            getTask.id = task.id
            getTask.querySelector('p').innerHTML = task.description
            if (task.done === 'true') {
                getTask.classList.add('task', 'done')
            } else {
                getTask.classList.add('task')
            }
            document.querySelector('#taskBox').appendChild(getTask)
        })

        // add eventListener to all delete/edit/check-icons 
        clickDelete()
        clickEdit()
        clickCheck()
    }
}

// EVENT: click add task button
document.querySelector('#addTask').addEventListener('click', async () => {
    const input = document.querySelector('#input').value
    if (input === '') {
        console.log('input required')
    } else {
        // create new task object
        const newTask = {}
        newTask.description = input
        newTask.done = 'false'
        try {
            await postData(newTask)
            await loadList()
            document.querySelector('#input').value = ''
        } catch (error) {
            console.log(error)
        }
    }
})

// FUNCTION: mark task done
const clickCheck = () => {
    // add event listener to all check icons
    document.querySelectorAll('.checkIcon').forEach(icon => {
        icon.addEventListener('click', async (event) => {
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

// FUNCTION: edit task 
const clickEdit = () => {
    // add event listener to all edit icons
    document.querySelectorAll('.editIcon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            // clone the pop-up model
            const popUpModel = document.querySelector('#popUp')
            const clonePopUp = popUpModel.cloneNode(true)
            clonePopUp.style.display = 'block'
            clonePopUp.setAttribute('id', 'popUpCopy')
            popUpModel.insertAdjacentElement('beforebegin', clonePopUp)
            // make the close button work
            closePopUp()
            // select ID of current task
            const taskID = event.target.parentElement.parentElement.id
            popUpFunction(taskID)
        })
    })
}

// FUNCTION: open pop-up
const popUpFunction = (taskID) => {
    document.querySelector('#editBtn').addEventListener('click', async () => {
        try {
            // edit name of current task
            const taskArray = await getData() 
            const updateTask = taskArray.find(task => task.id === taskID)
            updateTask.description = document.querySelector('#editName').value
            await editTask(updateTask, taskID)
            await loadList()
            // remove copy of pop-up model
            document.querySelector('#popUpCopy').remove()
        } catch (error) {
            console.log(error)
        } 
    })
}

// FUNCTION: close pop-up
const closePopUp = () => {
    document.querySelector('#closeBtn').addEventListener('click', () => {
        // remove copy of pop-up model
        document.querySelector('#popUpCopy').remove()
    })
}

// FUNCTION: click delete button
const clickDelete = () => {
    // add event listener to all delete icons
    document.querySelectorAll('.deleteIcon').forEach(icon => {
        icon.addEventListener('click', async (event) => {
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

// EVENT: click clear all button
document.querySelector('#clearBtn').addEventListener('click', async () => {
    try {
        await deleteAll()
        await loadList()
    } catch (error) {
        console.log(error)
    } 
})

// DEFAULT
loadList()
