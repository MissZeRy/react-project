import React, { useState, useEffect } from 'react'
import axios from 'axios';
import FormTodo from '../components/FormTodo'
import FormEdit from '../components/FormEdit'
import ListTodo from '../components/ListTodo'
import Header from '../components/Header';
import './TodoList.css'

function TodoList() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios.get('http://localhost:3001/todos').then((response) => {
      console.log(response)
      setTodos(response.data);
    }).catch((error) => {
      console.log(error)
    })
  };

  const addTodo = async (todo) => {
    await axios.post('http://localhost:3001/todos/create', {
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
    await axios.put(`http://localhost:3001/todos/update/${id}`, {
      text: task
    }).then((response) => {
      fetchTodos()
    }).catch((err) => {
      console.log(err)
    })
  }

  const SuccessID = async (com, id) => {
    await axios.put(`http://localhost:3001/todos/completed/${id}`, {
      completed: !com
    }).then((response) => {
      fetchTodos()
    }).catch((err) => {
      console.log(err)
    })
  }

  const DeleteId = async (id) => {
    await axios.delete(`http://localhost:3001/todos/delete/${id}`).then((response) => {
      setTodos(todos.filter((todo) => {
        return todo._id !== id
      }))
    })
  }


  return (
    <div>
      <Header />
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


















// import React, { useState } from 'react'
// import FormTodo from '../components/FormTodo'
// import FormEdit from '../components/FormEdit'
// import ListTodo from '../components/ListTodo'
// import './TodoList.css'

// function TodoList() {
//   const [todos, setTodos] = useState([])

//   const addTodo = (todo) => {
//     setTodos([
//       {
//         id: todos.length + 1,
//         task: todo,
//         completed: false,
//         isEditing: false
//       },...todos
//     ])
//   }

//   const EditId = (id) => {
//     setTodos(
//       todos.map((todo) => (
//         todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
//       ))
//     )
//   }

//   const DeleteId = (id) => {
//     setTodos(todos.filter((todo) => {
//       return todo.id !== id
//     }))
//   }

//   const SuccessID = (id) => {
//     const taskSuccess = document.querySelector(`.${id}`)
//     console.log(taskSuccess)
//         taskSuccess.classList.toggle('success')
//   }

//   const UpdateTodo = (task, id) => {
//     setTodos(
//       todos.map((todo) => (
//         todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
//       ))
//     )
//   }

//   return (
//     <div>
//       <div className="container-todolist">
//         <div className="todo-list">
//           <h1>TO DO LIST</h1>
//           <FormTodo addTodo={addTodo} />
//           {todos.map((todo) =>
//             todo.isEditing ? (
//               <FormEdit task={todo} updateValue={UpdateTodo} />
//             ) :
//               (
//                 <ListTodo task={todo} EditId={EditId} DeleteId={DeleteId} Success={SuccessID} key={todo.id} />
//               )
//           )}
//         </div>
//       </div>
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//                 integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
//                 crossorigin="anonymous" referrerpolicy="no-referrer" />
//     </div>
//   )
// }

// export default TodoList