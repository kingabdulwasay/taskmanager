const id = document.getElementById("taskId")
const title = document.getElementById("taskTitle")
const done = document.getElementById("taskDone")

var updateState
id.addEventListener("click", () => {
    if (!updateState)
        document.getElementById("submit").innerHTML = `<i class="fas fa-plus"></i> Add task`
})
title.addEventListener("click", () => {
    if (!updateState)
        document.getElementById("submit").innerHTML = `<i class="fas fa-plus"></i> Add task`
})
done.addEventListener("click", () => {
    if (!updateState)
        document.getElementById("submit").innerHTML = `<i class="fas fa-plus"></i> Add task`
})

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('https://basic-crud-ivory.vercel.app/tasks')
    const items = await response.json()
    console.log(items)
    const tasksLList = document.querySelector('.tasks-list')
    tasksLList.innerHTML = ''
    var completed = 0
    for (let i = 0; i < items.length; i++) {
        const taskItem = document.createElement('div')
        if (items[i].done) {
            completed++
            taskItem.classList.add('task-item', 'completed')
        } else {
            taskItem.classList.add('task-item')
        }
        taskItem.innerHTML = ` <div class="task-content">
                            <div class="task-id">ID: ${items[i].id}</div>
                            <div class="task-title">${items[i].name}</div>
                            ${items[i].done ?
                `
                                <div class="task-status done"><i class="fas fa-check-circle"></i> Completed</div>
                                `  : `
                                <div class="task-status pending"><i class="fas fa-clock"></i> Pending </div>
                                `
            }
                            </div>
                  
                        <div class="task-actions">
                            <button id="edit" class="btn-action btn-edit" title="Edit task"><i class="fas fa-edit"></i></button>
                            <button id="delete" class="btn-action btn-delete" title="Delete task"><i class="fas fa-trash"></i></button>
                        </div>
        `

        taskItem.querySelector(".btn-edit").addEventListener("click", () => {
            editTask(items[i]);
        })

        taskItem.querySelector(".btn-delete").addEventListener("click", () => {
            deleteTask(items[i]);
        })
        tasksLList.appendChild(taskItem);

    }
    calculateStats(items.length, completed)
})

document.getElementById("submit").addEventListener("click", async () => {

    if ((id.value === "") || (title.value === "")) {
        alert("ID or Title is missing");
    }else{
        document.getElementById("submit").innerHTML = `<i class="fas fa-plus"></i> Processing....`
        if (!updateState) {
            const response = await fetch('https://basic-crud-ivory.vercel.app/tasks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ id: parseInt(id.value), name: title.value, done: done.checked })
            })
            console.log(await response.json())
            if (response.ok) {
                window.location.reload()
            }
        } else{
                document.getElementById("submit").innerHTML = `<i class="fas fa-pencil"></i> Processing....`

                const response = await fetch(`https://basic-crud-ivory.vercel.app/task/${id.value}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ id: parseInt(id.value), name: title.value, done: done.checked })
                })
                console.log(typeof await response.json())
                if (response.ok) {
                    window.location.reload()
                }else {
                    alert("Something went wrong, Try again")
                    window.location.reload()

                }
                }
            
        }
 
    
    


})


function editTask(task) {
    id.value = task.id
    title.value = task.name
    done.checked = task.done
    updateState = !updateState
    
        if (updateState) {
            document.getElementById("submit").innerHTML = `<i class="fas fa-pencil"></i> Update Task`
        
        }

}

async function deleteTask(task) {
    document.getElementById("submit").innerHTML = `<i class="fas fa-trash"></i> Processing....`

    const response = await fetch(`https://basic-crud-ivory.vercel.app/task/${task.id}`, { method: 'DELETE' })
    if (response.ok) {

        window.location.reload()
    }
}

function calculateStats(total, completed) {
    const stats = document.querySelector('.stats')
    stats.innerHTML = `
  
    <div class="stat-card">
                        <div class="stat-number"><i class="fas fa-list"></i>${total}</div>
                        <div class="stat-label">Total Tasks</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number"><i class="fas fa-check-circle"></i>${completed}</div>
                        <div class="stat-label">Completed</div>
                    </div>
    `
}

