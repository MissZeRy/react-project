import React, { useState } from 'react'

function FormTodo(props) {
    const [todo, setTodo] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (todo !== "") {
            props.addTodo(todo)
        }
        setTodo('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='add-todo-form'>
                <input type="text" value={todo} onChange={(event) => setTodo(event.target.value)}></input>
                <button className='todo-add-btn'>Add Todo</button>
            </form>
        </div>
    )
}

export default FormTodo