import React from 'react'

function ListTodo(props) {
    const { task } = props

    const Edit = (id) => {
        console.log("edit", id)
        props.EditId(id)
    }

    const Delete = (id) => {
        console.log("delete", id)
        props.DeleteId(id)
    }

    const Success = (id,com) => {
        props.Success(com, id)
    }

    return (
        <div>
            <div className="list-todo">
                <p className={task.completed ? 'completed': ''} onClick={()=> Success(task._id,task.completed)}>{task.text}</p>
                <div className="activity">
                    <i class="fa-solid fa-pen-to-square" onClick={() => Edit(task._id)}></i>
                    <i class="fa-solid fa-trash" onClick={() => Delete(task._id)}></i>
                </div>
            </div>
            
        </div>
    )
}

export default ListTodo