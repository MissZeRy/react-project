import React, { useState } from 'react'

function FormEdit({task, updateValue}) {

    const [value, setValue] = useState(task.text)

    const handleUpdate = (event) => {
        event.preventDefault()
        updateValue(value, task._id)
    }

    return (
        <div>
            <form onSubmit={handleUpdate} className='edit-todo-form'>
                <input type="text" value={value} onChange={(event)=> setValue(event.target.value)}></input>
                <button>Update</button>
            </form>
        </div>
    )
}

export default FormEdit