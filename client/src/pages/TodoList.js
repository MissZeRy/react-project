import React, { useState, useEffect } from 'react'
import axios from 'axios';
import FormTodo from '../components/FormTodo'
import FormEdit from '../components/FormEdit'
import ListTodo from '../components/ListTodo'
import Header from '../components/Header';
import './TodoList.css'


function TodoList({ onLogout }) {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(localStorage.getItem('userToken'))
    fetchTodosUser();
  }, []);
  
  const fetchTodosUser = async () => {
    await axios.get(`https://react-api-production.up.railway.app/todos/${localStorage.getItem('userToken')}`).then((response) => {
      setTodos(response.data);
    }).catch((error) => {
      console.log(error)
    })
  };

  const addTodo = async (todo) => {
    await axios.post('https://react-api-production.up.railway.app/todos/create', {
      user: user,
      text: todo,
      completed: false,
      isEditing: false
    }).then((response) => {
      setTodos([response.data, ...todos]);
    })

  }

  const EditId = (id) => {
    setTodos(
      todos.map((todo) => (
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      ))
    )
  }

  const UpdateTodo = async (task, id) => {
    await axios.put(`https://react-api-production.up.railway.app/todos/update/${id}`, {
      text: task
    }).then((response) => {
      fetchTodosUser()
    }).catch((err) => {
      console.log(err)
    })
  }

  const SuccessID = async (com, id) => {
    await axios.put(`https://react-api-production.up.railway.app/todos/completed/${id}`, {
      completed: !com
    }).then((response) => {
      fetchTodosUser()
    }).catch((err) => {
      console.log(err)
    })
  }

  const DeleteId = async (id) => {
    await axios.delete(`https://react-api-production.up.railway.app/todos/delete/${id}`).then((response) => {
      setTodos(todos.filter((todo) => {
        return todo._id !== id
      }))
    })
  }

  return (
    <div>
      <Header logout={onLogout} />
      <div className="container-todolist">
        <div className="todo-list">
          <h1>TO DO LIST</h1>
          <FormTodo addTodo={addTodo} />
          {todos.map((todo) =>
            todo.isEditing ? (
              <FormEdit task={todo} updateValue={UpdateTodo} />
            ) :
              (
                <ListTodo task={todo} EditId={EditId} DeleteId={DeleteId} Success={SuccessID} key={todo.id} />
              )
          )}
        </div>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    </div>
  )
}

export default TodoList