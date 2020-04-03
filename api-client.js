// GET TASK LIST
const getData = async function(){
    const apiUrl = `https://wincacademydatabase.firebaseio.com/evi/tasks.json`
    try {
        const result = await fetch(apiUrl, { method: 'GET' })
        const data = await result.json()

        //console.log('Before (the raw result):', data);
        let tasks = Object.keys(data).map(key => ({
            id: key,
            description: data[key].description,
            done: data[key].done
        }));
        // message to the console
        console.log('current task-list:', tasks)
        return tasks

    } catch (error) {
        console.log(error)
    }
} 

// POST NEW TASK 
const postData = async function(task){
    const apiUrl = `https://wincacademydatabase.firebaseio.com/evi/tasks.json`
    try {
        const newPost = await fetch(apiUrl, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const content = await newPost.json()
        // message to the console
        console.log('task added:', content)

    } catch (error) {
        console.log(error)
    }
}

// EDIT TASK
const editTask = async function(task, taskID){
    const apiUrl = `https://wincacademydatabase.firebaseio.com/evi/tasks/${taskID}.json`
    try {
        const editPost = await fetch(apiUrl, { 
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        // message to the console
        console.log('this task has been edited:', editPost)

    } catch (error) {
        console.log(error)
    }
}

// EDIT DONE STATUS
const editDone = async function(task, taskID){
    const apiUrl = `https://wincacademydatabase.firebaseio.com/evi/tasks/${taskID}.json`
    try {
        const editPost = await fetch(apiUrl, { 
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        // message to the console
        console.log('this task has been edited:', editPost)
    } catch (error) {
        console.log(error)
    }
}

// DELETE ONE TASK
const deleteTask = async function(taskID){
    const apiUrl = `https://wincacademydatabase.firebaseio.com/evi/tasks/${taskID}.json`
    try {
        const deletePost = await fetch(apiUrl, { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // message to the console
        console.log('this task has been deleted:', deletePost)

    } catch (error) {
        console.log(error)
    }
}

// DELETE ALL
const deleteAll = async function(){
    const apiUrl = `https://wincacademydatabase.firebaseio.com/evi/tasks.json`
    try {
        await fetch(apiUrl, { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log('all tasks deleted')

    } catch (error) {
        console.log(error)
    }
}



